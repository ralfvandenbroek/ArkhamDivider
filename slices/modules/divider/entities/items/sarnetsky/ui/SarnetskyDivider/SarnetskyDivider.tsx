import { useRef } from "react";
import {
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useSarnetskySxOptions } from "../../lib";
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
	const containerRef = useRef<HTMLElement>(null);

	const sxOptions = useSarnetskySxOptions(props);
	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const radialXPSx = getPrintSx(S.getRadialXPSx);
	const inlineXPSx = getPrintSx(S.getInlineXPSx);
	const playerSubtitleSx = getPrintSx(S.getPlayerSubtitleSx);
	const scenarioSubtitleSx = getPrintSx(S.getScenarioSubtitleSx);
	const scenarioContentSx = getPrintSx(S.getScenarioContentSx);

	const { xpCost } = sxOptions;

	return (
		<SarnetskyDividerContext.Provider
			value={{
				divider: props,
				sxOptions,
				containerRef,
			}}
		>
			<Container>
				<Background {...props} />
				<Content sx={sx} ref={containerRef}>
					<Title divider={props} sx={titleSx} />
					<SecondaryIcons divider={props} />
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
