/* global self ReadableStream Response */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

const map = new Map();

// This should be called once per download
// Each event has a dataChannel that the data will be piped through
self.onmessage = (event) => {
  // We send a heartbeat every x second to keep the
  // service worker alive if a transferable stream is not sent
  if (event.data === "ping") {
    return;
  }

  const data = event.data;
  const downloadUrl =
    data.url ||
    self.registration.scope +
    Math.random() +
    "/" +
    (typeof data === "string" ? data : data.filename);
  const port = event.ports[0];
  const metadata = new Array(3); // [stream, data, port]

  metadata[1] = data;
  metadata[2] = port;

  // Note to self:
  // old streamsaver v1.2.0 might still use `readableStream`...
  // but v2.0.0 will always transfer the stream through MessageChannel #94
  if (event.data.readableStream) {
    metadata[0] = event.data.readableStream;
  } else if (event.data.transferringReadable) {
    // Firefox: readableStream arrives on the port after this handler runs.
    // Registering the URL in the map before the stream exists makes
    // fetch respondWith(new Response(undefined, …)) and breaks other loads.
    port.onmessage = (evt) => {
      port.onmessage = null;
      metadata[0] = evt.data.readableStream;
      map.set(downloadUrl, metadata);
      port.postMessage({ download: downloadUrl });
    };
    return;
  } else {
    metadata[0] = createStream(port);
  }

  map.set(downloadUrl, metadata);
  port.postMessage({ download: downloadUrl });
};

function createStream(port) {
  // ReadableStream is only supported by chrome 52
  return new ReadableStream({
    start(controller) {
      // When we receive data on the messageChannel, we write
      port.onmessage = ({ data }) => {
        if (data === "end") {
          return controller.close();
        }

        if (data === "abort") {
          controller.error("Aborted the download");
          return;
        }

        controller.enqueue(data);
      };
    },
    cancel(reason) {
      console.log("user aborted", reason);
      port.postMessage({ abort: true });
    },
  });
}

self.onfetch = (event) => {
  const url = event.request.url;

  // this only works for Firefox
  if (url.endsWith("/ping")) {
    return event.respondWith(new Response("pong"));
  }

  const hijacke = map.get(url);

  if (!hijacke) {
    return null;
  }

  const [stream, data, port] = hijacke;

  if (!stream) {
    console.error("[StreamSaver] missing readableStream for", url);
    return null;
  }

  map.delete(url);

  // Only safe headers (Firefox can throw on new Response(stream) when CSP / XSS
  // headers sit on a streaming body, and charset on octet-stream is invalid).
  const responseHeaders = new Headers({
    "Content-Type": "application/octet-stream",
  });

  const headers = new Headers(data.headers || {});

  if (headers.has("Content-Length")) {
    responseHeaders.set("Content-Length", headers.get("Content-Length"));
  }

  if (headers.has("Content-Disposition")) {
    responseHeaders.set(
      "Content-Disposition",
      headers.get("Content-Disposition"),
    );
  }

  // data, data.filename and size should not be used anymore
  if (data.size) {
    console.warn("Deprecated");
    responseHeaders.set("Content-Length", data.size);
  }

  let fileName = typeof data === "string" ? data : data.filename;
  if (fileName) {
    console.warn("Deprecated");
    // RFC5987; avoid global `escape` in service worker scope
    fileName = encodeURIComponent(fileName)
      .replace(
        /['()*]/g,
        (c) =>
          "%" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"),
      )
      .replace(/\*/g, "%2A");
    responseHeaders.set(
      "Content-Disposition",
      "attachment; filename*=UTF-8''" + fileName,
    );
  }

  event.respondWith(new Response(stream, { headers: responseHeaders }));

  port.postMessage({ debug: "Download started" });
};
