import type { BoxRect } from "../model";

export const preventDefault = <T extends { preventDefault: () => void }>(
	event: T,
) => {
	event.preventDefault();
};

export const getNodeRect = ({
	node,
	container,
}: {
	node: HTMLElement;
	container: HTMLElement;
}) => {
	const nodeRect = node.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	const { width, height } = containerRect;

	const rect: BoxRect = {
		top: nodeRect.top - containerRect.top,
		right: containerRect.right - nodeRect.right,
		bottom: containerRect.bottom - nodeRect.bottom,
		left: nodeRect.left - containerRect.left,
		width,
		height,
	};
	return rect;
};

export const isBoxRectEquals = (a: BoxRect, b: BoxRect, minDelta = 0.01) => {
	const keys: (keyof BoxRect)[] = [
		"top",
		"right",
		"bottom",
		"left",
		"width",
		"height",
	];
	for (const key of keys) {
		const diff = a[key] - b[key];
		if (Math.abs(diff) > minDelta) {
			return false;
		}
	}
	return true;
};
