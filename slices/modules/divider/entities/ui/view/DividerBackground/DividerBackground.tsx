import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { DividerBleedView } from "../DividerBleedView";

type DividerBackgroundProps = Omit<BoxProps<"img">, "component">;

export function DividerBackground({ src, ...props }: DividerBackgroundProps) {
	return (
		<DividerBleedView {...props}>
			<Box
				component="img"
				src={src}
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</DividerBleedView>
	);
}
