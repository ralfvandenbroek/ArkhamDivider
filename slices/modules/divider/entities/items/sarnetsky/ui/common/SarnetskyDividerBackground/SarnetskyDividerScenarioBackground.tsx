import { SarnetskyFrame } from "@assets/images/background/sarnetsky";
import { Box, type BoxProps, type SxProps } from "@mui/material";
import { useContext, useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import type { DividerType } from "@/modules/divider/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { absoluteFill } from "@/shared/config";
import { useAppSelector } from "@/shared/lib";
import { getSarnetskyStoryColor } from "../../../lib";
import { SarnetskyDividerContext } from "../../SarnetskyDividerContext";

type SarnetskyDividerScenarioBackgroundProps = BoxProps & {
	type: DividerType;
	story?: StoryWithRelations;
};
export function SarnetskyDividerScenarioBackground({
	type,
	story,
	...props
}: SarnetskyDividerScenarioBackgroundProps) {
	const { divider } = useContext(SarnetskyDividerContext);

	const layout = useAppSelector(selectLayout);

	const id = useMemo(() => {
		switch (type) {
			case "scenario":
			case "campaign":
				return "scenario";
			case "encounter":
				return "encounter";
			default:
				return null;
		}
	}, [type]);

	if (!id || !layout) {
		return null;
	}

	const { orientation } = layout;

	const defaultColor = getSarnetskyStoryColor(story);
	const color = divider.params?.frameColor ?? defaultColor;

	const prefix = `/images/divider/background/sarnetsky/${orientation}/${id}`;

	const backgroundSrc = `${prefix}/background.jpg`;
	const frameSrc = `${prefix}/frame.png`;

	const Color = SarnetskyFrame[orientation][id];

	const sx = {
		position: "absolute",
		width: "100%",
		height: "100%",
		...props.sx,
	} as SxProps;

	return (
		<Box sx={sx}>
			<Box
				component="img"
				src={backgroundSrc}
				sx={{ ...absoluteFill, zIndex: 1, objectFit: "cover" }}
			/>

			<Color
				fill={color}
				style={{
					...absoluteFill,
					zIndex: 2,
					mixBlendMode: "multiply",
					transform: "translate3d(0, 0, 0)",
				}}
			/>
			<Box component="img" src={frameSrc} sx={{ ...absoluteFill, zIndex: 3 }} />
		</Box>
	);
}
