import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { vips } from "./vips.plugin";

dotenv.config({
	path: [".env", ".env.local"],
});

export default defineConfig({
	worker: {
		format: "es",
	},
	plugins: [
		vips(),
		tsconfigPaths(),
		react({
			// Enable Fast Refresh for better HMR support
			// Default is already on; set explicitly for reliability
			jsxRuntime: "automatic",
		}),
		mkcert(),
		svgr(),
	],
	server: {
		hmr: {
			// Improve HMR for React components
			overlay: true,
			// Optional: set HMR port explicitly
			// clientPort: 5173,
		},
		// Disable full reload on errors; use HMR only
		watch: {
			// Ignore changes in node_modules and other unnecessary paths
			ignored: ["**/node_modules/**", "**/.git/**"],
		},
		headers: {
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin",
		},
	},
	// Optimize deps for better HMR
	optimizeDeps: {
		// Pre-bundle these for faster HMR
		include: ["react", "react-dom", "react-router"],
		exclude: ["wasm-vips"],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes("node_modules")) {
						return;
					}
					// @emotion before react: paths like @emotion/react contain "/react/"
					if (id.includes("@mui") || id.includes("@emotion")) {
						return "mui-vendor";
					}
					if (
						id.includes("react-dom") ||
						id.includes("react-router") ||
						id.includes("react-i18next") ||
						/[/\\]node_modules[/\\]react[/\\]/.test(id)
					) {
						return "react-vendor";
					}
					if (
						id.includes("redux-saga") ||
						id.includes("@reduxjs") ||
						id.includes("/redux/")
					) {
						return "redux-vendor";
					}
					// Only core `i18next` — `id.includes("i18next")` wrongly matched `react-i18next`
					if (/[/\\]node_modules[/\\]i18next[/\\]/.test(id)) {
						return "i18n-vendor";
					}
				},
			},
		},
	},
	assetsInclude: ["**/*.ttf"],
});
