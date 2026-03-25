import { useCallback, useRef } from "react";
import { setDividerParam, updateDivider } from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { useAppDispatch } from "@/shared/lib";

type Options<T> = {
	divider: DividerWithRelations<T>;
	defaultValue?: string;
	param: string;
};

type Params = Record<string, string>;

export const useDividerText = <T>({
	divider,
	param,
	defaultValue: defaultValueProp,
}: Options<T>) => {
	const dispatch = useAppDispatch();
	const { story, id } = divider;
	const params = divider.params as unknown as Params | undefined;
	const defaultCustomValue = params?.[param];
	const defaultValue = defaultCustomValue ?? defaultValueProp;
	const customValueRef = useRef(defaultValue);
	const fontSizeScaleRef = useRef<number | null>(divider.fontSizeScale ?? null);

	const onChange = useCallback((value: string) => {
		customValueRef.current = value;
	}, []);

	const { translateStory } = useStoryTranslation(story);
	const translatedValue = defaultValueProp ?? translateStory(divider.title);

	const onBlur = useCallback(() => {
		dispatch(
			setDividerParam({ id, key: param, value: customValueRef.current }),
		);

		const nextFontSizeScale = fontSizeScaleRef.current;
		if (
			typeof nextFontSizeScale === "number" &&
			nextFontSizeScale !== divider.fontSizeScale
		) {
			dispatch(
				updateDivider({ id, changes: { fontSizeScale: nextFontSizeScale } }),
			);
		}
	}, [id, dispatch, param, divider.fontSizeScale]);

	const onFontSizeChange = useCallback((fontSizeScale: number) => {
		fontSizeScaleRef.current = fontSizeScale;
	}, []);

	const value = customValueRef.current ?? translatedValue;

	return {
		value,
		translatedValue,
		onChange,
		onBlur,
		onFontSizeChange,
	};
};
