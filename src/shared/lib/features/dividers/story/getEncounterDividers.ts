import { isNotNil, propEq } from 'ramda';
import { removePunctuation, uniqId } from '@/shared/lib/features/util/common';
import { DividerType } from '@/shared/types/dividers';
import { getEncounterSize } from './getEncounterSize';
import { getStoryScenarios } from './getScenarioDividers';
import { IGetStoryDividersOptions } from './getStoryDividers';
import { getScenarioNumber, getStoryNumber } from "./numbering";

type IGetEncounterDividersParams = IGetStoryDividersOptions;

export const getEncounterDividers = (options: IGetEncounterDividersParams) => {
  const {
    story,
    includeExtraSets,
    includeScenarioEncounterSet,
    includeCampaignIcon,
    includeEncounters,
    encounterSets,
    extraStory,
  } = options;

  if (!includeEncounters && !includeScenarioEncounterSet && !includeExtraSets) {
    return [];
  }

  const { icon, encounter_sets, extra_encounter_sets } = story;

  const scenarios = [
    ...getStoryScenarios(story),
    ...(extraStory ? getStoryScenarios(extraStory) : []),
  ];

  const formatText = (text: string) => removePunctuation(text).toLowerCase();

  const scenarioNames = Object.fromEntries(scenarios.map((scenario) => [formatText(scenario.scenario_name), scenario]));

  const campaignIcon = icon;

  const extraEncounters = includeExtraSets ? extra_encounter_sets : [];

  const encounters = [...encounter_sets, ...extraEncounters];

  return encounters
    .map((code) => {
      const isExtra = extra_encounter_sets.includes(code);
      const encounter = encounterSets.find(propEq(code, 'code'));

      if (!encounter) {
        return;
      }

      const { name, icon } = encounter;
      const encounterName = name.toLowerCase();
      const isScenario = Boolean(icon) && scenarioNames[formatText(encounterName)] !== undefined;

      if (!includeScenarioEncounterSet && isScenario) {
        return;
      }

      if (!isScenario && !includeEncounters && !includeExtraSets) {
        return;
      }

      if (!includeEncounters && !isExtra) {
        return;
      }

      const sizeData = getEncounterSize({
        ...options,
        isExtra,
        encounter,
      });

      return {
        id: uniqId() + code,
        ...sizeData,
        scenarioNumber: getScenarioNumber(code, scenarioNames[formatText(encounterName)], story, encounterSets),
        story,
        storyNumber: getStoryNumber(story),
        name,
        icon,
        campaignIcon,
        encounterSet: encounter,
        type: DividerType.ENCOUNTER,
        displayCampaignIcon: includeCampaignIcon,
      };
    })
    .filter(isNotNil)
    .sort((a, b) => {
        if (a.scenarioNumber == b.scenarioNumber) {
            return a.name.localeCompare(b.name);
        } else if (a.scenarioNumber == '') {
            return 1;
        } else if (b.scenarioNumber == '') {
            return -1;
        } else {
            const aNumber = Number(a.scenarioNumber.replace(/\D.*$/, ''));
            const bNumber = Number(b.scenarioNumber.replace(/\D.*$/, ''));
            if (aNumber == bNumber) {
                return a.scenarioNumber.localeCompare(b.scenarioNumber);
            } else {
                return aNumber - bNumber;
            }
        }
    });
};
