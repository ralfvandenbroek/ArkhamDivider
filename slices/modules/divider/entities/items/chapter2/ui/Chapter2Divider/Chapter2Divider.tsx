import { Box } from "@mui/material";
import {
	DividerBackground,
	DividerColorPicker,
	DividerContainer,
	DividerContent,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import {
	getChapter2DividerDefaultColor,
	getChapter2DividerDefaultIcon,
} from "../../lib";
import type { Chapter2DividerProps } from "../../model/chapter2";
import * as S from "./Chapter2Divider.styles";

const background = "/images/divider/background/chapter2/background.avif";

export function Chapter2Divider(props: Chapter2DividerProps) {
	// const { id, layoutType, params } = props;
	const defaultIcon = getChapter2DividerDefaultIcon(props);

	const getPrintSx = usePrintUnit();
	const iconSx = getPrintSx(S.getIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const overlaySx = getPrintSx(S.getOverlaySx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);
	const menuSx = getPrintSx(S.getMenuSx);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon,
	});

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "backgroundIcon",
		defaultIcon,
	});

	const defaultColor = getChapter2DividerDefaultColor(props);

	const color = props.params?.color ?? defaultColor;

	return (
		<DividerContainer>
			<DividerBackground src={background} />

			<Box sx={overlaySx} bgcolor={color} />
			<DividerContent zIndex={3}>
				<DividerIcon
					dividerId={props.id}
					icon={icon}
					onClick={selectIcon}
					sx={iconSx}
					scaleType="circle"
				/>
				<DividerIcon
					dividerId={props.id}
					icon={backgroundIcon}
					onClick={selectBackgroundIcon}
					sx={backgroundSx}
				/>
				<DividerColorPicker
					dividerId={props.id}
					param="color"
					defaultColor={defaultColor}
					sx={colorPickerSx}
				/>
				<DividerMenu dividerId={props.id} sx={menuSx} />
			</DividerContent>
		</DividerContainer>
	);
}
