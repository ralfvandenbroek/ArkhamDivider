import {
	isScenarioDividerType,
	selectLayout,
} from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
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
import { SarnetskyDividerTitle } from "../SarnetskyDividerTitle";
import {
	SarnetskyDividerPlayerSubtitle as PlayerSubtitle,
	SarnetskyDividerScenarioSubtitle as ScenarioSubtitle,
} from "../subtitle";
import { SarnetskyDividerSideRadialXP as RadialXP } from "../xp";
import { SarnetskyDividerInlineXP as InlineXP } from "../xp/SarnetskyDividerInlineXP";
import * as S from "./SarnetskyDivider.styles";

export function SarnetskyDivider(props: SarnetskyDividerProps) {
	const { id, icon } = props;
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const O = getSarnetskyLayoutObjects(layout);

	const mm = usePrintUnitCallback();

	const icons = useSarnetskyDividerIcons({ divider: props, objects: O });

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

	const getDividerIcon = useDividerIcon({
		dividerId: id,
	});

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "background",
		defaultIcon: icon,
	});

	const isScenario = isScenarioDividerType(props);

	return (
		<Container>
			<Background {...props} />
			<Content sx={sx}>
				<SarnetskyDividerTitle
					divider={props}
					sx={titleSx}
					sxOptions={sxOptions}
				/>
				{isScenario && (
					<>
						<Icon
							dividerId={id}
							icon={backgroundIcon}
							onClick={selectBackgroundIcon}
							sx={backgroundIconSx}
						/>
						<ScenarioSubtitle divider={props} sx={scenarioSubtitleSx} />
					</>
				)}
				{icons.map(({ icon, setIcon, config }) => (
					<Icon
						key={config.id}
						dividerId={id}
						icon={icon}
						onClick={setIcon}
						{...config.params}
						sx={{
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 3,
							top: mm(config.top),
							right: mm(config.right),
							fontSize: mm(config.fontSize),
							width: mm(config.width),
							height: mm(config.height),
							color: config.light ? "#fff" : "#000",
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
				<PlayerSubtitle sx={playerSubtitleSx} divider={props} />
			</Content>
		</Container>
	);
}
