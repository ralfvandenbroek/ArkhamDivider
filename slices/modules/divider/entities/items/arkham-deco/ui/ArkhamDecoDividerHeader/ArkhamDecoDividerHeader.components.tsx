import { Box } from "@mui/material";
import { useContext } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { DividerOrientation } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamDecoAssetUrl } from "../../config";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext/ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerHeader.styles";

const asset = prefix(arkhamDecoAssetUrl);

export const LeftScenarioCorner = ({
	orientation,
}: {
	orientation: DividerOrientation;
}) => {
	const getPrintSx = usePrintUnit();

	if (orientation === "horizontal") {
		const sx = getPrintSx(S.getLeftHorizontalCornerSx);
		return <Image src={asset("/top-left-corner.png")} sx={sx} />;
	}

	const sx = getPrintSx(S.getLeftVerticalCornerSx);
	return <Image src={asset("/top-corner.png")} sx={sx} />;
};

export const RightScenarioCorner = ({
	orientation: _,
}: {
	orientation: DividerOrientation;
}) => {
	const getPrintSx = usePrintUnit();

	// if (orientation === "horizontal") {
	// 	const sx = getPrintSx(S.getRightHorizontalScenarioCornerSx);
	// 	return <Image src={asset("/top-right-corner.png")} sx={sx} />;
	// }

	const sx = getPrintSx(S.getRightHorizontalScenarioCornerSx);
	return <Image src={asset("/top-right-corner.png")} sx={sx} />;
};

export const TopLine = () => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getTopLineSx);
	return <Image src={asset("/top-line.svg")} sx={sx} />;
};

export const NoIconLine = () => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getNoIconLineSx);
	return <Image src={asset("/top-line.png")} sx={sx} />;
};

export const ScenarioCorner = ({ scenario }: { scenario: StoryScenario }) => {
	const { sxOptions } = useContext(ArkhamDecoDividerContext);

	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getScenarioCornerSx);
	const backgroundSx = getPrintSx(S.getScenarioBackgroundSx);
	const numberSx = getPrintSx(S.getScenarioNumberSx);

	const scenarioNumber = scenario.number_text;

	return (
		<Box sx={sx}>
			<Box sx={numberSx}>{scenarioNumber || <Icon icon="typejournal" />}</Box>

			<Image src={asset("/scenario-tentacles.png")} sx={backgroundSx} />
		</Box>
	);
};
