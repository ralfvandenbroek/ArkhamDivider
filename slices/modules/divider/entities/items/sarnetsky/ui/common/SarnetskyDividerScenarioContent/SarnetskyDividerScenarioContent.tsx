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
	const getPrintSx = usePrintUnit(sxOptions);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const isScenario = isScenarioDividerType(divider);

	if (!isScenario) {
		return null;
	}

	return (
		<>
			<ScenarioSubtitle divider={divider} sx={subtitleSx} />
			<Box {...props}>
				<Stack sx={{ height: "100%", justifyContent: "space-between" }}>
					<Stack sx={backgroundSx}>
						<BackgroundIcon sx={backgroundIconSx} divider={divider} />
					</Stack>

					{divider.type === "scenario" && (
						<Encounters scenario={divider.scenario} />
					)}
				</Stack>
			</Box>
		</>
	);
}
