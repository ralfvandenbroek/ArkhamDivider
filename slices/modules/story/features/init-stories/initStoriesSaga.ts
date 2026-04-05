import { isNotNull } from "ramda-adjunct";
import { put, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { getStoryScenarios, setStories } from "../../shared/lib";
import type { StoryScenario } from "../../shared/model";

const normalize = (str: string) => {
	return str
		.normalize("NFD")
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, "");
};

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const stories = payload.stories.map((story) => {
		const filterFn = (s: StoryScenario) => (e: EncounterSet) =>
			e.icon === s.icon && normalize(e.name) === normalize(s.scenario_name);

		const scenarios = story.scenarios?.filter(
			(scenario) => payload.encounterSets.findIndex(filterFn(scenario)) > -1,
		);

		if (story.code === "rttcu" && story.return_to_code && scenarios) {
			payload.stories
				.filter((s) => s.code === story.return_to_code)
				.forEach((story) => {
					getStoryScenarios(story)
						.filter((s) => s.id === "disappearance_at_the_twilight_estate")
						.forEach((scenario) => {
							scenarios.push({
								...scenario,
								id: `return_to_${scenario.id}`,
								icon: `return_to_${scenario.id}`,
								campaign_id: `rt${scenario.campaign_id}`,
								scenario_name: `Return to ${scenario.scenario_name}`,
								full_name: `${scenario.header}: Return to ${scenario.scenario_name}`,
							});
						});
				});
		}

		const scenarioEncounterSets =
			scenarios
				?.filter(
					(scenario) => payload.encounterSets.find(filterFn(scenario))?.code,
				)
				.filter(isNotNull)
				.map((scenario) => scenario.id) || [];

		const returnStory = payload.stories.find(
			({ return_to_code }) => return_to_code === story.code,
		);

		const returnScenarios = returnStory && getStoryScenarios(returnStory);

		return {
			...story,
			scenarios: scenarios,
			scenario_encounter_sets: scenarioEncounterSets,
			id: v4(),
			supported: true,
			translated: true,
			return_code: returnStory?.code,
			return_scenarios: returnScenarios,
			return_encounter_sets: returnStory?.encounter_sets,
			return_scenario_encounter_sets: returnStory?.scenario_encounter_sets,
		};
	});

	yield put(setStories(stories));
}

export function* initStoriesSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
