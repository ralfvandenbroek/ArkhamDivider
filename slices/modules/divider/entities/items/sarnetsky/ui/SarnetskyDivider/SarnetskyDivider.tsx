import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import {
	getDividerSubtype,
	getDividerXPCost,
} from "@/modules/divider/shared/lib/logic/params";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getSarnetskyLayoutObjects } from "../../lib";
import type { SarnetskyDividerProps } from "../../model";
import {
	SarnetskyDividerBackground as Background,
	SarnetskyDividerScenarioContent as ScenarioContent,
	SarnetskyDividerTitle as Title,
} from "../common";
import { SarnetskyDividerSecondaryIcons as SecondaryIcons } from "../icon";
import { SarnetskyDividerContext } from "../SarnetskyDividerContext";
import { SarnetskyDividerPlayerSubtitle as PlayerSubtitle } from "../subtitle";
import { SarnetskyDividerSideRadialXP as RadialXP } from "../xp";
import { SarnetskyDividerInlineXP as InlineXP } from "../xp/SarnetskyDividerInlineXP";
import * as S from "./SarnetskyDivider.styles";

export function SarnetskyDivider(props: SarnetskyDividerProps) {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const O = getSarnetskyLayoutObjects(layout);

	const faction = getDividerFaction(props);
	const subtype = getDividerSubtype(props);

	const xpCost = getDividerXPCost(props);

	const sxOptions = {
		objects: O,
		orientation: layout.orientation,
		type: props.type,
		faction,
		subtype,
		xpCost,
	};

	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const radialXPSx = getPrintSx(S.getRadialXPSx);
	const inlineXPSx = getPrintSx(S.getInlineXPSx);
	const playerSubtitleSx = getPrintSx(S.getPlayerSubtitleSx);
	const scenarioSubtitleSx = getPrintSx(S.getScenarioSubtitleSx);
	const scenarioContentSx = getPrintSx(S.getScenarioContentSx);

	return (
		<SarnetskyDividerContext.Provider value={{ divider: props, sxOptions }}>
			<Container>
				<Background {...props} />
				<Content sx={sx}>
					<Title divider={props} sx={titleSx} />
					<SecondaryIcons objects={O} divider={props} />
					<ScenarioContent
						divider={props}
						sx={scenarioContentSx}
						subtitleSx={scenarioSubtitleSx}
					/>
					{xpCost && (
						<>
							<RadialXP sx={radialXPSx} xpCost={xpCost} />
							<InlineXP sx={inlineXPSx} xpCost={xpCost} />
						</>
					)}
					<PlayerSubtitle sx={playerSubtitleSx} divider={props} />
				</Content>
			</Container>
		</SarnetskyDividerContext.Provider>
	);
}
