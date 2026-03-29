import type { BoxProps, SxProps } from "@mui/material";
import { isUndefined } from "ramda-adjunct";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { getRynoDividerHueRotation } from "../../lib";
import type { RynoDividerProps } from "../../model";
import * as S from "./RynoDivider.styles";

export const Header = ({
	src,
	divider,
	...props
}: BoxProps<"img"> & {
	divider: RynoDividerProps;
}) => {
	const getPrintSx = usePrintUnit();
	const headerSx = getPrintSx(S.getHeaderSx);
	const hue = getRynoDividerHueRotation(divider);

	const filter = isUndefined(hue) ? "grayscale(1)" : `hue-rotate(${hue}deg)`;

	const sx = {
		...headerSx,
		filter,
	} as SxProps;

	return <Image {...props} src={src} sx={sx} />;
};
