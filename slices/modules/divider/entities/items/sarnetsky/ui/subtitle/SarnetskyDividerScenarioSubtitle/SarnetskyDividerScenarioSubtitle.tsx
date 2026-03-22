import { Box, type BoxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import type { SarnetskyDividerProps } from "../../../model";
import * as S from "./SarnetskyDividerScenarioSubtitle.styles";

type SarnetskyDividerScenarioSubtitleProps = BoxProps & {
	divider: SarnetskyDividerProps;
};

export function SarnetskyDividerScenarioSubtitle({
	divider,
	...props
}: SarnetskyDividerScenarioSubtitleProps) {
	const { t } = useTranslation();
	const getPrintSx = usePrintUnit();

	if (divider.type !== "scenario") {
		return;
	}
	const { story, scenario } = divider;
	if (!scenario || !story) {
		return;
	}

	const sx = getPrintSx(S.getSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const clearSx = getPrintSx(S.getClearSx);

	const space = "\u{200B}";
	const defaultValue = `${t(story.name)}. ${space}${t(scenario.header)}`;

	return (
		<Box {...props}>
			<DividerText
				dividerId={divider.id}
				sx={sx}
				outlineSx={outlineSx}
				clearProps={{
					sx: clearSx,
				}}
				defaultValue={defaultValue}
			/>
		</Box>
	);
}
