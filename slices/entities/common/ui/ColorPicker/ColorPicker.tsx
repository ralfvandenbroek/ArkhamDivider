import { Box, type BoxProps, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { ColorPickerModal } from "../ColorPickerModal";
import * as S from "./ColorPicker.styles";

type ColorPickerProps = BoxProps & {
	onColorSelect: (color?: string) => void;
	value?: string;
	defaultValue?: string;
};

export function ColorPicker({
	title,
	onColorSelect: onColorSelectProp,
	defaultValue,
	value,
	...props
}: ColorPickerProps) {
	const color = value ?? defaultValue;

	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getSx);
	const [open, setOpen] = useBoolean(false);

	const onColorSelect = useCallback(
		(color?: string) => {
			onColorSelectProp(color);
			setOpen.off();
		},
		[onColorSelectProp, setOpen.off],
	);

	return (
		<Box {...props} displayPrint="none">
			<Tooltip title={title} arrow>
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
