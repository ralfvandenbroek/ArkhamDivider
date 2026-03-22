import { Box, type BoxProps } from "@mui/material";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { getEncounterSetGroups } from "@/modules/encounterSet/shared/lib/logic";
import type { StoryScenario } from "@/modules/story/shared/model";
import { useAppSelector } from "@/shared/lib";
import { SarnetskyDividerEncounterSetGroup as EncounterSetGroup } from "../SarnetskyDividerEncounterSetGroup";

type SarnetskyDividerScenarioEncountersProps = BoxProps & {
	scenario: StoryScenario;
	mainScenario?: StoryScenario;
	showName?: boolean;
};

export function SarnetskyDividerScenarioEncounters({
	scenario,
	showName: showNameProp,
	mainScenario,
	...props
}: SarnetskyDividerScenarioEncountersProps) {
	const encounterSets = useAppSelector(selectEncounterSets);

	const groups = getEncounterSetGroups({
		mainScenario,
		scenario,
		encounterSets,
	});

	const visibleGroups = groups.filter(
		({ main, side }) => main.length > 0 || side.length > 0,
	);

	if (visibleGroups.length === 0) {
		return null;
	}

	const showName = showNameProp || visibleGroups.length > 1;

	return (
		<Box {...props}>
			{visibleGroups.map((group) => (
				<EncounterSetGroup
					{...props}
					key={group.id}
					groupName={scenario.part_text ?? group.version_number.toString()}
					showName={showName}
					group={group}
				/>
			))}
		</Box>
	);
}
