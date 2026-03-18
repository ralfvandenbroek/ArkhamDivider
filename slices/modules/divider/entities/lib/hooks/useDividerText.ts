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

	const onChange = useCallback((value: string) => {
		customValueRef.current = value;
	}, []);

	const { translateStory } = useStoryTranslation(story);
	const translatedValue = translateStory(divider.title);

	const onBlur = useCallback(() => {
		dispatch(
			setDividerParam({ id, key: param, value: customValueRef.current }),
		);
	}, [id, dispatch, param]);

	const onFontSizeChange = useCallback(
		(fontSizeScale: number) => {
			dispatch(updateDivider({ id, changes: { fontSizeScale } }));
		},
		[id, dispatch],
	);

	const value = customValueRef.current ?? translatedValue;

	return {
		value,
		translatedValue,
		onChange,
		onBlur,
		onFontSizeChange,
	};
};
