import { isNumber } from "ramda-adjunct";
import { useCallback } from "react";
import { setDividerParam, updateDivider } from "@/modules/divider/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import type { UseDividerTextOptions } from "./useDividerText.types";
import { useDividerTextSeedValue } from "./useDividerTextSeedValue";
import { useDividerTextValue } from "./useDividerTextValue";
import { useFontSizeScaleRef } from "./useFontSizeScaleRef";

/**
 * High-level hook that wires together:
 * - default/persisted text resolution + translations
 * - reactive local editing value (updates immediately, not only on blur)
 * - persisting edited value + font size scale on blur
 *
 * Contract:
 * - If `params[param]` exists, it always wins as the displayed value.
 * - Otherwise the value follows the translated default until the user edits it.
 */
export const useDividerText = <T>({
	divider,
	param,
	defaultValue: defaultValueProp,
	fontSizeScaleParam,
	custom = false,
}: UseDividerTextOptions<T>) => {
	const dispatch = useAppDispatch();
	const { id } = divider;

	const defaultFontSizeScale = fontSizeScaleParam
		? (divider.params as Record<string, string> | undefined)?.[
				fontSizeScaleParam
			]
		: divider.fontSizeScale;

	const {
		seedValue,
		defaultCurrentValue,
		isControlledByParams,
		persistedValue,
	} = useDividerTextSeedValue({
		divider,
		param,
		defaultValue: defaultValueProp,
		custom,
	});

	const { value, onChange } = useDividerTextValue({
		dividerId: id,
		seedValue,
		persistedValue,
		isControlledByParams,
	});

	const { fontSizeScaleRef, onFontSizeChange } = useFontSizeScaleRef(
		divider.fontSizeScale,
	);

	const onBlur = useCallback(() => {
		dispatch(setDividerParam({ id, key: param, value }));

		const nextFontSizeScale = fontSizeScaleRef.current;

		const shouldUpdateFontSizeScale =
			isNumber(nextFontSizeScale) && nextFontSizeScale !== defaultFontSizeScale;

		if (!shouldUpdateFontSizeScale) {
			return;
		}

		if (fontSizeScaleParam) {
			dispatch(
				setDividerParam({
					id,
					key: fontSizeScaleParam,
					value: nextFontSizeScale,
				}),
			);
		}

		dispatch(
			updateDivider({
				id,
				changes: {
					fontSizeScale: nextFontSizeScale,
				},
			}),
		);
	}, [
		id,
		dispatch,
		param,
		value,
		defaultFontSizeScale,
		fontSizeScaleParam,
		fontSizeScaleRef,
	]);

	return {
		value,
		translatedValue: defaultCurrentValue,
		onChange,
		onBlur,
		onFontSizeChange,
	};
};
