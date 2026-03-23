import { Stack, type StackProps } from "@mui/material";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useScenarioEncounterSetGroups } from "@/modules/story/entities/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { SarnetskyDividerEncounterSetGroup as EncounterSetGroup } from "../SarnetskyDividerEncounterSetGroup";
import * as S from "./SarnetskyDividerEncounters.styles";

type SarnetskyDividerEncountersProps = StackProps & {
	scenario: StoryScenario;
};

export function SarnetskyDividerEncounters({
	scenario,
	...props
}: SarnetskyDividerEncountersProps) {
	const groups = useScenarioEncounterSetGroups(scenario);
	const rows = groups.length;

	const getPrintSx = usePrintUnit({
		rows,
	});

	if (groups.length === 0) {
		return null;
	}

	const containerSx = getPrintSx(S.getContainerSx);
	const sx = {
		...containerSx,
		...props.sx,
	};

	return (
		<Stack {...props} sx={sx}>
			{groups.map(({ id, group, groupName, showName }) => (
				<EncounterSetGroup
					key={id}
					group={group}
					groupName={groupName}
					showName={showName}
				/>
			))}
		</Stack>
	);
}
