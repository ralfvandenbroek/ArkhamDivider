import { Box, type BoxProps } from "@mui/material";
import type { SarnetskyDividerProps } from "../../../../model";
import { SarnetskyDividerScenarioEncounters as ScenarioEncounters } from "../SarnetskyDividerScenarioEncounters";
import { SarnetskyDividerScenarioGroupEncounters as ScenarioGroupEncounters } from "../SarnetskyDividerScenarioGroupEncounters";

type SarnetskyDividerScenarioEncountersProps = BoxProps & {
	divider: SarnetskyDividerProps;
};

export function SarnetskyDividerEncounters({
	divider,
	...props
}: SarnetskyDividerScenarioEncountersProps) {
	if (divider.type !== "scenario") {
		return null;
	}
	const { scenario } = divider;
	const { scenarios } = scenario;

	return (
		<Box {...props}>
			{!scenarios && <ScenarioEncounters scenario={scenario} />}
			{scenarios && (
				<ScenarioGroupEncounters
					mainScenario={scenario}
					scenarios={scenarios}
				/>
			)}
		</Box>
	);
}
