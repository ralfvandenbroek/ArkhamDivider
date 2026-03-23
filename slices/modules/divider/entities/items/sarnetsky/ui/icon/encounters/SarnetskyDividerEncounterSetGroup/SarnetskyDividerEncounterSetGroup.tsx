import { Box } from "@mui/material";
import { useContext } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { EncounterSetGroup } from "@/modules/encounterSet/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import { SarnetskyDividerContext } from "../../../SarnetskyDividerContext";
import * as S from "./SarnetskyDividerEncounterSetGroup.styles";

type SarnetskyDividerEncounterSetGroupProps = RowProps & {
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
	const { sxOptions } = useContext(SarnetskyDividerContext);

	const mainSize = group.main.length;
	const sideSize = group.side.length;

	const showSeparator = mainSize > 0 && sideSize > 0;

	const getPrintSx = usePrintUnit({
		...sxOptions,
		mainSize,
		sideSize,
	});

	const sxProp = getPrintSx(S.getContainerSx);
	const iconSx = getPrintSx(S.getIconSx);
	const listSx = getPrintSx(S.getListSx);
	const separatorSx = getPrintSx(S.getSeparatorSx);
	const groupNameSx = getPrintSx(S.getGroupNameSx);
	const listContainerSx = getPrintSx(S.getListContainerSx);

	const sx = {
		...sxProp,
		...props.sx,
	};

	return (
		<Row {...props} sx={sx}>
			{showName && <Box sx={groupNameSx}>{groupName}:</Box>}
			<Row sx={listContainerSx}>
				{group.main.length > 0 && (
					<Row sx={listSx}>
						{group.main.map((encounter) => (
							<Icon key={encounter} icon={encounter} sx={iconSx} />
						))}
					</Row>
				)}
				{showSeparator && <Box sx={separatorSx} />}
				{group.side.length > 0 && (
					<Row sx={listSx}>
						{group.side.map((encounter) => (
							<Icon key={encounter} icon={encounter} sx={iconSx} />
						))}
					</Row>
				)}
			</Row>
		</Row>
	);
}
