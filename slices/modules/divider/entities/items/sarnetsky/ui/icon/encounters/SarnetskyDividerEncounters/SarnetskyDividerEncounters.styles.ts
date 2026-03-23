import type { PrintSxCallback } from "@/modules/print/shared/model";

const getPaddingBottom = (rows: number) => {
	const paddingMap: Record<number, number> = {
		1: 4.5,
		2: 1,
	};
	return paddingMap[rows] ?? 0;
};

export const getContainerSx: PrintSxCallback<{ rows: number }> = ({
	mm,
	rows,
}) => ({
	paddingTop: mm(1),
	paddingBottom: mm(getPaddingBottom(rows)),
	gap: mm(2),
});
