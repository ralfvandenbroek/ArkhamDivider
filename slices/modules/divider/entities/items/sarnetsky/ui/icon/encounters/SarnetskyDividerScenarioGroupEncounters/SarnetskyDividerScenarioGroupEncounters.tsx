import { Box, type BoxProps } from "@mui/material";
import { groupScenariosBySameEncounters } from "@/modules/story/shared/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { SarnetskyDividerScenarioEncounters as ScenarioEncounters } from "../SarnetskyDividerScenarioEncounters";

type SarnetskyDividerScenarioGroupEncountersProps = BoxProps & {
	mainScenario: StoryScenario;
	scenarios: StoryScenario[];
};

export function SarnetskyDividerScenarioGroupEncounters({
	mainScenario,
	scenarios,
	...props
}: SarnetskyDividerScenarioGroupEncountersProps) {
	const scenarioGroups = groupScenariosBySameEncounters(scenarios);

	return (
		<Box {...props}>
			{scenarioGroups.length === 1 && (
				<ScenarioEncounters
					mainScenario={mainScenario}
					scenario={scenarios[0]}
				/>
			)}
			{scenarioGroups.length > 1 && (
				<Box>
					{scenarioGroups.map((group) => (
						<ScenarioEncounters
							key={group[0].id}
							showName
							mainScenario={mainScenario}
							scenario={group[0]}
						/>
					))}
				</Box>
			)}
		</Box>
	);
}
