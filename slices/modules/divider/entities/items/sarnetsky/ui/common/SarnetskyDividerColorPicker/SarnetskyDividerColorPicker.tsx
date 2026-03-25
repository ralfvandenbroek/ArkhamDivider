import { Box, type BoxProps } from "@mui/material";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorPicker } from "@/entities/common/ui";
import { setDividerParam } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import { getSarnetskyStoryColor } from "../../../lib";
import { SarnetskyDividerContext } from "../../SarnetskyDividerContext";
import * as S from "./SarnetskyDividerColorPicker.styles";

type SarnetskyDividerColorPickerProps = BoxProps;

export function SarnetskyDividerColorPicker(
	props: SarnetskyDividerColorPickerProps,
) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { divider } = useContext(SarnetskyDividerContext);
	const defaultColor = getSarnetskyStoryColor(divider.story);
	const color = divider.params?.frameColor ?? defaultColor;

	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getSx);
	const onColorSelect = useCallback(
		(color?: string) => {
			dispatch(
				setDividerParam({ id: divider.id, key: "frameColor", value: color }),
			);
		},
		[divider.id, dispatch],
	);

	return (
		<Box {...props} displayPrint="none">
			<ColorPicker
				sx={sx}
				value={color}
				defaultValue={defaultColor}
				onColorSelect={onColorSelect}
				title={t`divider.sarnetsky.frameColor.pickerTitle`}
			/>
		</Box>
	);
}
