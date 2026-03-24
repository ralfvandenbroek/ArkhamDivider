import { Box, type BoxProps, Tooltip } from "@mui/material";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorPickerModal } from "@/entities/common/ui";
import { setDividerParam } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
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
	const [open, setOpen] = useBoolean(false);

	const onColorSelect = useCallback(
		(color?: string) => {
			dispatch(
				setDividerParam({ id: divider.id, key: "frameColor", value: color }),
			);
			setOpen.off();
		},
		[divider.id, dispatch, setOpen.off],
	);

	return (
		<Box {...props} displayPrint="none">
			<Tooltip title={t`divider.sarnetsky.frameColor.pickerTitle`} arrow>
				<Box sx={sx} bgcolor={color} onClick={setOpen.toggle} />
			</Tooltip>
			<ColorPickerModal
				open={open}
				value={color}
				onClose={setOpen.off}
				onCancel={setOpen.off}
				onColorSelect={onColorSelect}
			/>
		</Box>
	);
}
