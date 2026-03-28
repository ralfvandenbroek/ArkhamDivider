import type { ModalProps } from "@mui/material";
import { Button, Dialog, DialogActions, Stack } from "@mui/material";
import type { ColorResult } from "@uiw/color-convert";
import Chrome from "@uiw/react-color-chrome";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type ColorPickerModalProps = Omit<ModalProps, "children"> & {
	value?: string;
	defaultValue?: string;
	onColorSelect?: (color?: string) => void;
	onCancel?: () => void;
};

const defaultColor = "#fff";

export function ColorPickerModal({
	value,
	defaultValue,
	...props
}: ColorPickerModalProps) {
	const { t } = useTranslation();
	const [color, setColor] = useState(value ?? defaultColor);

	const close = useCallback(() => {
		props.onCancel?.();
	}, [props.onCancel]);

	const select = useCallback(() => {
		props.onColorSelect?.(color);
	}, [props.onColorSelect, color]);

	const reset = useCallback(() => {
		props.onColorSelect?.(defaultValue);
	}, [defaultValue, props.onColorSelect]);

	const onColorChange = useCallback((color: ColorResult) => {
		setColor(color.hexa);
	}, []);

	return (
		<Dialog {...props}>
			<Stack p={2} justifyContent="center" alignItems="center">
				<Chrome
					color={color}
					onChange={onColorChange}
					style={{
						zoom: 1.5,
					}}
				/>
			</Stack>
			<DialogActions
				sx={{
					flexShrink: 0,
					flexWrap: "wrap",
					gap: {
						xs: `0.5em 0em`,
					},
				}}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={close}
					sx={{
						marginLeft: { xs: 1, md: 0 },
					}}
				>{t`Cancel`}</Button>

				<Button
					variant="contained"
					color="secondary"
					onClick={reset}
					sx={{ order: { xs: -1, sm: 0 } }}
				>
					{t`Default`}
				</Button>
				<Button variant="contained" color="primary" onClick={select}>
					{t`Ok`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
