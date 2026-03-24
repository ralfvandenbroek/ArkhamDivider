import { Box, type BoxProps, Stack, type SxProps } from "@mui/material";
import { useContext } from "react";
import { isScenarioDividerType } from "@/modules/divider/entities/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import type { SarnetskyDividerProps } from "../../../model";
import { SarnetskyDividerBackgroundIcon as BackgroundIcon } from "../../icon";
import { SarnetskyDividerEncounters as Encounters } from "../../icon/encounters";
import { SarnetskyDividerContext } from "../../SarnetskyDividerContext";
import { SarnetskyDividerScenarioSubtitle as ScenarioSubtitle } from "../../subtitle";
import * as S from "./SarnetskyDividerScenarioContent.styles";
import { useBackgroundIconRect } from "./useBackgroundIconRect";

type SarnetskyDividerScenarioContentProps = BoxProps & {
	divider: SarnetskyDividerProps;
	subtitleSx?: SxProps;
};

export function SarnetskyDividerScenarioContent({
	divider,
	subtitleSx,
	...props
}: SarnetskyDividerScenarioContentProps) {
	const { sxOptions } = useContext(SarnetskyDividerContext);
	const ref = useBackgroundIconRect({ dividerId: divider.id });
	const getPrintSx = usePrintUnit(sxOptions);

	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundContainerSx = getPrintSx(S.getBackgroundContainerSx);
	const isScenario = isScenarioDividerType(divider);

	if (!isScenario) {
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
			</Box>
		</>
	);
}
