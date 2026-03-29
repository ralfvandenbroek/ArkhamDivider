import { Box, type BoxProps, type SxProps } from "@mui/material";
import { useCallback } from "react";
import { ColorPicker } from "@/entities/common/ui";
import {
	selectDividerById,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

type DividerColorPickerProps = BoxProps & {
	dividerId: string;
	pickerSx?: SxProps;
	defaultColor?: string;
	param: string;
};

export function DividerColorPicker({
	dividerId,
	pickerSx,
	defaultColor,
	param,
	title,
	...props
}: DividerColorPickerProps) {
	const dispatch = useAppDispatch();
	const divider = useAppSelector((state) =>
		selectDividerById(state, dividerId),
	);

	const params = divider?.params as Record<string, unknown> | undefined;
	const value = params?.[param] as string | undefined;

	const onColorSelect = useCallback(
		(color?: string) => {
			dispatch(setDividerParam({ id: divider.id, key: param, value: color }));
		},
		[divider.id, param, dispatch],
	);

	return (
		<NotExportable>
			<Box {...props} displayPrint="none">
				<ColorPicker
					value={value}
					defaultValue={defaultColor}
					onColorSelect={onColorSelect}
					title={title}
				/>
			</Box>
		</NotExportable>
	);
}
