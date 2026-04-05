import { isUndefined } from "ramda-adjunct";
import { useTranslation } from "react-i18next";
import { getRynoScenarioNumber } from "../../../lib";
import type { RynoDividerProps } from "../../../model";

export const getRynoDividerDefaultTitle = (props: RynoDividerProps) => {
	const { t } = useTranslation();
	const scenario = props.story
		? props.story.scenarios.filter((s) => s.icon === props.icon)[0]
		: undefined;
	const scenarioNumber = scenario
		? getRynoScenarioNumber(scenario, props.story)
		: "";
	return (
		(!isUndefined(scenarioNumber) ? scenarioNumber.toUpperCase() : "") +
		" " +
		t(
			props.title === "Return Cult of Umôrdhoth"
				? "Cult of Umôrdhoth"
				: props.title,
		)
	).trim();
};
