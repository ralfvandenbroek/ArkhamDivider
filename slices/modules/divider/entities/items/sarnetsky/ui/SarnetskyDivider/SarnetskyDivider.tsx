import {
	isScenarioDividerType,
	selectLayout,
} from "@/modules/divider/entities/lib";
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
	SarnetskyDividerBackgroundIcon as BackgroundIcon,
	SarnetskyDividerSecondaryIcons as SecondaryIcons,
} from "../icon";
import { SarnetskyDividerEncounters as Encounters } from "../icon/encounters";
import { SarnetskyDividerBackground as Background } from "../SarnetskyDividerBackground";
import { SarnetskyDividerTitle as Title } from "../SarnetskyDividerTitle";
import {
	SarnetskyDividerPlayerSubtitle as PlayerSubtitle,
	SarnetskyDividerScenarioSubtitle as ScenarioSubtitle,
} from "../subtitle";
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
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const scenarioSubtitleSx = getPrintSx(S.getScenarioSubtitleSx);

	const isScenario = isScenarioDividerType(props);

	return (
		<Container>
			<Background {...props} />
			<Content sx={sx}>
				<Title divider={props} sx={titleSx} sxOptions={sxOptions} />
				{isScenario && (
					<>
						<BackgroundIcon sx={backgroundIconSx} divider={props} />
						<ScenarioSubtitle divider={props} sx={scenarioSubtitleSx} />
						<Encounters divider={props} />
					</>
				)}
				<SecondaryIcons objects={O} divider={props} />
				{xpCost && (
					<>
						<RadialXP sx={radialXPSx} xpCost={xpCost} />
						<InlineXP sx={inlineXPSx} xpCost={xpCost} />
					</>
				)}
				<PlayerSubtitle sx={playerSubtitleSx} divider={props} />
			</Content>
		</Container>
	);
}
