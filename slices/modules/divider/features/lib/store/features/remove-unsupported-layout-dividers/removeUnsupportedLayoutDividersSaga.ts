import { put, select, takeEvery } from "redux-saga/effects";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	selectDividers,
	setDividers,
	setLayoutId,
} from "@/modules/divider/shared/lib";

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!layout) {
		return;
	}

	const allDividers: ReturnType<typeof selectDividers> =
		yield select(selectDividers);

	const dividers = allDividers.filter((divider) => {
		return layout.types.includes(divider.layoutType);
	});

	if (dividers.length === allDividers.length) {
		return;
	}

	yield put(setDividers(dividers));
}

export function* removeUnsupportedLayoutDividersSaga() {
	yield takeEvery(setLayoutId.match, worker);
}
