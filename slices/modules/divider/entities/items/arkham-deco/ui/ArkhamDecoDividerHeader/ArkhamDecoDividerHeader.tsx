import { Box, type BoxProps } from "@mui/material";
import { useContext } from "react";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { getArkhamDecoIcons } from "../../lib";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext/ArkhamDecoDividerContext";
import * as C from "./ArkhamDecoDividerHeader.components";
import * as S from "./ArkhamDecoDividerHeader.styles";

type ArkhamDecoDividerHeaderProps = BoxProps;

export function ArkhamDecoDividerHeader(props: ArkhamDecoDividerHeaderProps) {
	const { layout, divider } = useContext(ArkhamDecoDividerContext);
	const getPrintSx = usePrintUnit();
	const { orientation } = layout;

	const icon = getArkhamDecoIcons({ divider, layout });

	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const rightIconSx = getPrintSx(S.getRightIconSx);

	return (
		<Box {...props}>
			<C.LeftScenarioCorner orientation={orientation} />
			<C.RightScenarioCorner orientation={orientation} />
			{!icon.center && <C.NoIconLine />}
			<DividerIcon dividerId={divider.id} icon={icon.left} sx={leftIconSx} />
			<DividerIcon dividerId={divider.id} icon={icon.right} sx={rightIconSx} />
			{divider.type === "scenario" && <C.ScenarioCorner />}
		</Box>
	);
}
