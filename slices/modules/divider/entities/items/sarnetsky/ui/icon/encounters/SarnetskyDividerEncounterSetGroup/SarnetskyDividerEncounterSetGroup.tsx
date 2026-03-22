import { Box, type BoxProps } from "@mui/material";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { EncounterSetGroup } from "@/modules/encounterSet/shared/model";

type SarnetskyDividerEncounterSetGroupProps = BoxProps & {
	showName?: boolean;
	groupName: string;
	group: EncounterSetGroup;
};

export function SarnetskyDividerEncounterSetGroup({
	group,
	groupName,
	showName,
	...props
}: SarnetskyDividerEncounterSetGroupProps) {
	// const mainSize = group.main.length;
	// const sideSize = group.side.length;
	// const totalSize = mainSize + sideSize;

	return (
		<Box {...props}>
			{showName && <Box>{groupName}:</Box>}
			{group.main.length > 0 && (
				<Box>
					{group.main.map((encounter) => (
						<Icon key={encounter} icon={encounter} />
					))}
				</Box>
			)}
			{group.side.length > 0 && (
				<Box>
					{group.side.map((encounter) => (
						<Icon key={encounter} icon={encounter} />
					))}
				</Box>
			)}
		</Box>
	);
}
