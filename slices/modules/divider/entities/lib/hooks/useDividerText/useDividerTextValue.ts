import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
	dividerId: string;
	seedValue: string;
	isControlledByParams: boolean;
};

/**
 * Holds the live, editable text value for a divider field.
 *
 * Responsibility:
 * - Keep `value` in state so UI updates immediately on change.
 * - Sync `value` from `seedValue` when:
 *   - the value is controlled by persisted params, OR
 *   - a new divider instance is generated (`dividerId` changed), OR
 *   - user hasn't typed yet (or the field is empty) and the default changes.
 *
 * This avoids the common "useRef doesn't re-render" pitfall and prevents
 * stale defaults after divider regeneration.
 */
export function useDividerTextValue({
	dividerId,
	seedValue,
	isControlledByParams,
}: Options) {
	const isDirtyRef = useRef(false);
	const prevDividerIdRef = useRef(dividerId);

	const [value, setValue] = useState<string>(seedValue);

	const onChange = useCallback((next: string) => {
		isDirtyRef.current = true;
		setValue(next);
	}, []);

	useEffect(() => {
		const dividerChanged = prevDividerIdRef.current !== dividerId;
		prevDividerIdRef.current = dividerId;

		if (isControlledByParams) {
			isDirtyRef.current = false;
			setValue(seedValue);
			return;
		}

		if (dividerChanged) {
			isDirtyRef.current = false;
			setValue(seedValue);
			return;
		}

		const shouldFollowDefault = !isDirtyRef.current || value === "";
		if (shouldFollowDefault) {
			isDirtyRef.current = false;
			setValue(seedValue);
		}
	}, [dividerId, isControlledByParams, seedValue, value]);

	return { value, onChange };
}
