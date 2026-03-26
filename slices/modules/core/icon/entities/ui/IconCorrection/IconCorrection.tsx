import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { isString } from "ramda-adjunct";
import { getNumericStyleProps } from "@/shared/lib/ui";
import { defaultIconPositionManifest } from "../../../shared/config";
import { getIconCorrection } from "../../../shared/lib";
import type { IconPositionManifest } from "../../../shared/model";
import { Icon, type IconProps } from "../../../shared/ui";

export type IconCorrectionProps = IconProps & {
	manifest?: IconPositionManifest;
	disableCorrection?: boolean;
};

export function IconCorrection(props: IconCorrectionProps) {
	const {
		icon,
		manifest = defaultIconPositionManifest,
		disableCorrection = false,
		sx: sxProp,
		...restProps
	} = props;

	const position = getNumericStyleProps({
		props,
		properties: ["fontSize", "left", "right", "top", "bottom"],
	});

	const { fontSize, left = 0, right = 0, top = 0, bottom = 0 } = position;

	const correction =
		fontSize && isString(icon)
			? getIconCorrection({
					icon,
					manifest,
					fontSize,
				})
			: {
					fontSize,
					top: 0,
					left: 0,
				};

	const baseSx: SxProps = {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		lineHeight: 1,
	};

	const correctionSx = disableCorrection
		? {
				left: `${left}px`,
				right: `${right}px`,
				top: `${top}px`,
				bottom: `${bottom}px`,
			}
		: {
				left: `${left + correction.left}px`,
				right: `${right - correction.left}px`,
				top: `${top + correction.top}px`,
				bottom: `${bottom - correction.top}px`,
			};

	const sx = {
		...baseSx,
		...(correction.fontSize && { fontSize: `${correction.fontSize}px` }),
		...sxProp,
		...correctionSx,
	} as SxProps;
	return (
		<Box sx={sx}>
			<Icon icon={icon} {...restProps} />
		</Box>
	);
}
