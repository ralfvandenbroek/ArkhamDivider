import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamDecoAssetUrl } from "../../config";
import * as S from "./ArkhamDecoDivider.styles";

export const SideBorder = ({ position }: { position: "left" | "right" }) => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getSideBorderSx, { position });

	return <Image src={`${arkhamDecoAssetUrl}/center-border.svg`} sx={sx} />;
};
