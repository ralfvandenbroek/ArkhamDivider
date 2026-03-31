import { useCallback, useRef } from "react";
import { setDividerParam, updateDivider } from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { useAppDispatch } from "@/shared/lib";

type Options<T> = {
	divider: DividerWithRelations<T>;
	defaultValue?: string;
	param: string;
	fontSizeScaleParam?: string;
	custom?: boolean;
};

type Params = Record<string, string>;

export const useDividerText = <T>({
	divider,
	param,
	defaultValue: defaultValueProp,
	fontSizeScaleParam,
	custom = false,
}: Options<T>) => {
	const dispatch = useAppDispatch();
	const { story, id } = divider;
	const params = divider.params as unknown as Params | undefined;
	const defaultCustomValue = params?.[param];

	const defaultFontSizeScale = fontSizeScaleParam
		? params?.[fontSizeScaleParam]
		: divider.fontSizeScale;

	const fontSizeScaleRef = useRef<number | null>(divider.fontSizeScale ?? null);

	const onChange = useCallback((value: string) => {
		customValueRef.current = value;
	}, []);

	const { translateStory } = useStoryTranslation(story);
	const translatedValue = defaultValueProp ?? translateStory(divider.title);
	const translatedCustomValue = translateStory(defaultValueProp);

	const defaultCurrentValue = custom ? translatedCustomValue : translatedValue;
	const customValueRef = useRef(defaultCustomValue ?? defaultCurrentValue);

	const onBlur = useCallback(() => {
		dispatch(
			setDividerParam({ id, key: param, value: customValueRef.current }),
		);

		const nextFontSizeScale = fontSizeScaleRef.current;

		const shouldUpdateFontSizeScale =
			typeof nextFontSizeScale === "number" &&
			nextFontSizeScale !== defaultFontSizeScale;
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
	}, [id, dispatch, param, defaultFontSizeScale, fontSizeScaleParam]);

	const onFontSizeChange = useCallback((fontSizeScale: number) => {
		fontSizeScaleRef.current = fontSizeScale;
	}, []);

	const value = customValueRef.current ?? defaultCurrentValue;

	return {
		value,
		translatedValue: defaultCurrentValue,
		onChange,
		onBlur,
		onFontSizeChange,
	};
};
