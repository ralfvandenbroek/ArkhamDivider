import { Box, type BoxProps } from "@mui/material";
import { useContext } from "react";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { selectPlayerParams } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getArkhamDecoIcons, showArkhamDecoRightIcon } from "../../lib";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext/ArkhamDecoDividerContext";
import { ArkhamDecoDividerSideXP as XP } from "../ArkhamDecoDividerSideXP";
import * as C from "./ArkhamDecoDividerHeader.components";
import * as S from "./ArkhamDecoDividerHeader.styles";

type ArkhamDecoDividerHeaderProps = BoxProps;

export function ArkhamDecoDividerHeader(props: ArkhamDecoDividerHeaderProps) {
	const { layout, divider, sxOptions } = useContext(ArkhamDecoDividerContext);
	const { numericXP = false, sideXP = false } =
		useAppSelector(selectPlayerParams);
	const getPrintSx = usePrintUnit(sxOptions);
	const { orientation } = layout;

	const I = getArkhamDecoIcons({ divider, layout });

	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const rightIconSx = getPrintSx(S.getRightIconSx);
	const centerIconSx = getPrintSx(S.getCenterIconSx);

	const xpCostSx = getPrintSx(S.getXpCostSx);
	const sideXPSx = getPrintSx(S.getSideXPSx);

	const showRightIcon = showArkhamDecoRightIcon({ divider, numericXP });
	const xpCost = getDividerXPCost(divider);

	const getDividerIcon = useDividerIcon({
		dividerId: divider.id,
		defaultIcon: I.left?.defaultIcon,
	});

	const [leftIcon, startLeftIcon] = getDividerIcon({
		param: I.left?.param ?? "none",
		defaultIcon: I.left?.defaultIcon,
	});
	const [rightIcon, startRightIcon] = getDividerIcon({
		param: I.right?.param ?? "none",
		defaultIcon: I.right?.defaultIcon,
	});
	const [centerIcon, startCenterIcon] = getDividerIcon({
		param: I.center?.param ?? "none",
		defaultIcon: I.center?.defaultIcon,
	});

	return (
		<>
			<Box {...props}>
				<C.LeftScenarioCorner orientation={orientation} />
				<C.RightScenarioCorner orientation={orientation} />
				{!I.center?.icon ? (
					<C.NoIconLine />
				) : (
					<>
						<C.StoryLine position="left" />
						<C.StoryLineTentacle position="left" />
						<C.StoryLine position="right" />
						<C.StoryLineTentacle position="right" />
					</>
				)}
				{divider.type === "scenario" && (
					<C.ScenarioCorner scenario={divider.scenario} />
				)}
			</Box>

			<DividerIcon
				dividerId={divider.id}
				icon={leftIcon}
				sx={leftIconSx}
				onClick={startLeftIcon}
			/>
			{showRightIcon && (
				<DividerIcon
					dividerId={divider.id}
					icon={rightIcon}
					sx={rightIconSx}
					onClick={startRightIcon}
				/>
			)}
			{!showRightIcon && xpCost && <Box sx={xpCostSx}>{xpCost.name}</Box>}
			{sideXP && xpCost && <XP xpCost={xpCost} sx={sideXPSx} />}

			{I.center?.icon && (
				<DividerIcon
					dividerId={divider.id}
					icon={centerIcon}
					sx={centerIconSx}
					onClick={startCenterIcon}
				/>
			)}
		</>
	);
}
