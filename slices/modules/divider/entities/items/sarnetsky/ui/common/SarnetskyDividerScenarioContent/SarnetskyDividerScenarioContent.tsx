import { Box, type BoxProps, Stack, type SxProps } from "@mui/material";
import { useContext } from "react";
import { useDividerObject } from "@/modules/divider/entities/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { SarnetskyDividerBackgroundIcon as BackgroundIcon } from "../../icon";
import { SarnetskyDividerEncounters as Encounters } from "../../icon/encounters";
import { SarnetskyDividerContext } from "../../SarnetskyDividerContext";
import { SarnetskyDividerScenarioSubtitle as ScenarioSubtitle } from "../../subtitle";
import { SarnetskyDividerColorPicker } from "../SarnetskyDividerColorPicker";
import * as S from "./SarnetskyDividerScenarioContent.styles";

type SarnetskyDividerScenarioContentProps = BoxProps & {
	subtitleSx?: SxProps;
};

export function SarnetskyDividerScenarioContent({
	subtitleSx,
	...props
}: SarnetskyDividerScenarioContentProps) {
	const { sxOptions, containerRef, divider } = useContext(
		SarnetskyDividerContext,
	);

	const ref = useDividerObject({
		dividerId: divider.id,
		containerRef,
		param: "backgroundIconRect",
	});

	const getPrintSx = usePrintUnit(sxOptions);

	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundContainerSx = getPrintSx(S.getBackgroundContainerSx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);

	if (divider.layoutType !== "scenario") {
		return null;
	}

	return (
		<>
			<ScenarioSubtitle divider={divider} sx={subtitleSx} />
			<Box {...props}>
				<Stack sx={{ height: "100%", justifyContent: "space-between" }}>
					<Stack sx={backgroundContainerSx}>
						<Stack sx={backgroundSx}>
							<Box sx={{ display: "inline-flex", flex: 1 }} ref={ref}>
								<BackgroundIcon sx={backgroundIconSx} divider={divider} />
							</Box>
						</Stack>
					</Stack>

					{divider.type === "scenario" && (
						<Encounters scenario={divider.scenario} />
					)}
				</Stack>
				<NotExportable>
					<SarnetskyDividerColorPicker sx={colorPickerSx} />
				</NotExportable>
			</Box>
		</>
	);
}
