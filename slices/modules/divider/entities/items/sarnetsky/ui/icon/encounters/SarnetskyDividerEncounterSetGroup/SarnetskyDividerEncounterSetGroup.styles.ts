import type { SarnetskyDividerSxCallback } from "../../../../model";

const gap = 2;

export const getContainerSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	alignItems: "center",
	fontSize: mm(O.encounterIcon.fontSize),
	gap: mm(gap),
});

export const getListSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	gap: mm(gap),
});

export const getIconSx: SarnetskyDividerSxCallback = () => ({
	textAlign: "center",
});

export const getListContainerSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	gap: mm(gap),
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
});

export const getSeparatorSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	height: mm(O.encounterIcon.fontSize),
	width: mm(0.25),
	backgroundColor: "black",
	flexShrink: 0,
});

export const getGroupNameSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	fontFamily: "ArnoPro",
	fontStyle: "italic",
	fontWeight: "bold",
	fontSize: mm(2.5),
	alignSelf: "flex-start",
});
