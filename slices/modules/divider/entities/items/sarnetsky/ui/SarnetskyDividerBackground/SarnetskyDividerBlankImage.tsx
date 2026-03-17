import { Box, type BoxProps } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";

export function SarnetskyDividerBlankImage(props: BoxProps) {
	const layout = useAppSelector(selectLayout);
	if (!layout) {
		return null;
	}
	const { orientation } = layout;
	const src = `/images/divider/background/sarnetsky/${orientation}/blank.jpg`;
	return <Box {...props} component="img" src={src} />;
}
