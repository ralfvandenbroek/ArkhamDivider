// import type { BoxProps } from "@mui/material";
// import * as C from "./RynoDividerHeader.components";

import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import {
	getRynoDividerDefaultSubtitle,
	showRynoDividerSubtitle,
	useRynoDividerSxOptions,
} from "../../lib";
import type { RynoDividerProps } from "../../model";
import * as S from "./RynoDividerHeader.styles";

type RynoDividerHeaderProps = {
	divider: RynoDividerProps;
};

export function RynoDividerHeader({ divider }: RynoDividerHeaderProps) {
	const sxOptions = useRynoDividerSxOptions();
	const getLocaleSx = useLocaleSx(sxOptions);
	const getPrintSx = usePrintUnit(sxOptions);

	const showSubtitle = showRynoDividerSubtitle(divider);

	const titleSx = getLocaleSx(S.getTitleSx, {
		showSubtitle,
		type: divider.type,
	});
	const clearSx = getPrintSx(S.getClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);

	const subtitleSx = getLocaleSx(S.getSubtitleSx);

	const {
		value: title,
		translatedValue: translatedTitle,
		onChange: onTitleChange,
		onBlur: onTitleBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customTitle",
	});

	const defaultSubtitle = getRynoDividerDefaultSubtitle(divider);

	const {
		value: subtitle,
		translatedValue: translatedSubtitle,
		onChange: onSubtitleChange,
		onBlur: onSubtitleBlur,
	} = useDividerText({
		divider,
		param: "customSubtitle",
		defaultValue: defaultSubtitle,
	});

	return (
		<>
			<DividerText
				dividerId={divider.id}
				sx={titleSx}
				value={title}
				defaultValue={translatedTitle}
				fitTextOptions={{
					minFontSize: 8,
					onFontSizeChange,
				}}
				onValueChange={onTitleChange}
				onBlur={onTitleBlur}
				clearProps={{ sx: clearSx }}
				outlineSx={outlineSx}
			/>
			{showSubtitle && (
				<DividerText
					dividerId={divider.id}
					sx={subtitleSx}
					value={subtitle}
					defaultValue={translatedSubtitle}
					onValueChange={onSubtitleChange}
					onBlur={onSubtitleBlur}
					clearProps={{ sx: clearSx }}
					outlineSx={outlineSx}
				/>
			)}
		</>
	);
}
