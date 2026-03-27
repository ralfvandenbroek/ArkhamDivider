import type { DividerOrientation } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamDecoAssetUrl } from "../../config";
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

export const ScenarioCorner = () => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getScenarioCornerSx);
	return <Image src={asset("/scenario-tentacles.png")} sx={sx} />;
};
