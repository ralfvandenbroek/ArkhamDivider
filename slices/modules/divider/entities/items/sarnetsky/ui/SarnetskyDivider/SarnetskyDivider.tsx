import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { selectLayout, useDividerText } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
} from "@/modules/divider/entities/ui";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import {
	getDividerSubtype,
	getDividerXPCost,
} from "@/modules/divider/shared/lib/logic/params";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintUnit, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getSarnetskyLayoutObjects, useSarnetskyDividerIcons } from "../../lib";
import type { SarnetskyDividerProps } from "../../model";
import { SarnetskyDividerBackground as Background } from "../SarnetskyDividerBackground";
import { SarnetskyDividerSideRadialXP as RadialXP } from "../xp";
import { SarnetskyDividerInlineXP as InlineXP } from "../xp/SarnetskyDividerInlineXP";
import * as S from "./SarnetskyDivider.styles";

export function SarnetskyDivider(props: SarnetskyDividerProps) {
	const { id } = props;
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const O = getSarnetskyLayoutObjects(layout);

	const mm = usePrintUnitCallback();

	const icons = useSarnetskyDividerIcons({ divider: props, objects: O });

	const faction = getDividerFaction(props);
	const subtype = getDividerSubtype(props);

	const sxOptions = {
		objects: O,
		orientation: layout.orientation,
		type: props.type,
		faction,
		subtype,
	};

	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTitleSx);

	const getPrintSx = usePrintUnit(sxOptions);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const radialXPSx = getPrintSx(S.getRadialXPSx);
	const inlineXPSx = getPrintSx(S.getInlineXPSx);

	const {
		value: title,
		translatedValue: translatedTitle,
		onChange: onTitleChange,
		onBlur: onTitleBlur,
		onFontSizeChange,
	} = useDividerText({
		divider: props,
		param: "customTitle",
	});

	const xpCost = getDividerXPCost(props);

	return (
		<Container>
			<Background {...props} />
			<Content>
				<DividerText
					dividerId={id}
					sx={titleSx}
					value={title}
					defaultValue={translatedTitle}
					fitTextOptions={{
						minFontSize: 8,
						onFontSizeChange,
					}}
					onValueChange={onTitleChange}
					onBlur={onTitleBlur}
					clearProps={{ sx: titleClearSx }}
					outlineSx={outlineSx}
				/>
				{icons.map(({ icon, setIcon, config }) => (
					<Icon
						key={config.id}
						dividerId={id}
						icon={icon}
						onClick={setIcon}
						top={mm(config.top)}
						right={mm(config.right)}
						fontSize={mm(config.fontSize)}
						{...config.params}
						sx={{
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 3,
							width: mm(config.width),
							height: mm(config.height),
							cursor: "pointer",
							"&:hover": {
								opacity: 0.5,
							},
						}}
					/>
				))}
				{xpCost && (
					<>
						<RadialXP sx={radialXPSx} xpCost={xpCost} />
						<InlineXP sx={inlineXPSx} xpCost={xpCost} />
					</>
				)}
			</Content>
		</Container>
	);
}
