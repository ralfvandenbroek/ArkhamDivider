import type { DividerOrientation } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamDecoAssetUrl } from "../../config";
import * as S from "./ArkhamDecoDivider.styles";

export const SideBorder = ({ position }: { position: "left" | "right" }) => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getSideBorderSx, { position });

	return <Image src={`${arkhamDecoAssetUrl}/center-border.svg`} sx={sx} />;
};

export const Scratches = ({
	orientation,
}: {
	orientation: DividerOrientation;
}) => {
	const positions = {
		horizontal: [
			{
				top: "49%",
				left: "89%",
				width: "141%",
				opacity: 0.9,
				transform: "translate(-50%, -50%)",
			},
			{
				top: "-29%",
				left: "52%",
				width: "100%",
				opacity: 0.3,
				transform: "translate(-50%, -50%)",
			},
			{
				top: "49%",
				left: "-4%",
				width: "38%",
				height: "108%",
				opacity: 0.9,
				transform: "translate(-50%, -50%)",
			},
			{
				top: "49%",
				right: "-39%",
				width: "38%",
				height: "108%",
				opacity: 0.9,
				transform: "translate(-50%, -50%)",
			},
		],
		vertical: [
			{
				top: "51%",
				left: "36%",
				width: "226%",
				opacity: 0.9,
				transform: "translate(-50%, -50%)",
			},
			{
				top: "-29%",
				left: "52%",
				width: "200%",
				opacity: 0.3,
				transform: "none",
			},
		],
	};

	return (
		<>
			{positions[orientation].map((position, index) => (
				<Image
					key={index.toString()}
					src={`${arkhamDecoAssetUrl}/scratches.png`}
					sx={{ ...position, position: "absolute", zIndex: 4 }}
				/>
			))}
		</>
	);
};
