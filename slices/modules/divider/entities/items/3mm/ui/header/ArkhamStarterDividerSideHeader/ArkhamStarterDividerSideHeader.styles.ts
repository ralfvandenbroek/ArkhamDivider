import type { PrintSxCallback } from "@/modules/print/shared/model";
import { arkhamStarterLayoutObjects as O } from "../../../config";
import type { ArkhamStarterDividerTitleObject as TitleObject } from "../../../model";

export const getStripSx: PrintSxCallback<{ side: "left" | "right" }> = ({
	mm,
	side,
}) => ({
	position: "absolute",
	top: mm(0),
	[side]: mm(-3.5),
	transform: side === "left" ? "scaleX(-1)" : "none",
	zIndex: -1,
});

export const getTitleSx: PrintSxCallback<{ title: TitleObject }> = ({
	mm,
	title: T,
}) => ({
	position: "absolute",
	top: mm(0),
	left: mm(T.vertical.left),
	right: mm(T.vertical.right),
	height: mm(T.vertical.height),
});

export const getStoryTitleSx: PrintSxCallback<{ side: "left" | "right" }> = ({
	mm,
	side,
}) => ({
	position: "absolute",
	top: mm(O.storyTitle.top),
	[side]: mm(O.storyTitle.right),
	height: mm(O.storyTitle.height),
	fontSize: mm(O.storyTitle.fontSize),
});

export const getCornerIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(0),
	left: mm(0),
	height: mm(O.cornerIcon.height),
	width: mm(O.cornerIcon.width),
	fontSize: mm(O.cornerIcon.fontSize),
});

export const getPlayerIconSx: PrintSxCallback<{ title: typeof O.title }> = ({
	mm,
	title: T,
}) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(O.storyIcon.top),
	left: mm(T.vertical.left - O.storyIcon.width - 1.5),
	fontSize: mm(O.storyIcon.fontSize),
	width: mm(O.storyIcon.width),
	height: mm(O.storyIcon.height),
});
