import { ascend, sortWith } from 'ramda';
import { toArrayIfExists, uniqId } from '@/shared/lib/features/util/common';
import { IScenario, IStory } from '@/shared/types/api';
import { DividerType } from '@/shared/types/dividers';
import { FirstParam } from '@/shared/types/util';
import { getScenarioSize } from './getScenarioSize';
import { getScenarioNumber, getStoryNumber } from './numbering';

type IGetSizeOptions = FirstParam<typeof getScenarioSize>;
type IGetScenarioDividersOptions = Omit<IGetSizeOptions, 'scenario'> & {
  includeCampaignIcon: boolean;
  story: IStory;
  includeScenarios: boolean;
};

export const getStoryScenarios = ({ scenario, scenarios = [] }: IStory) => [
  ...toArrayIfExists(scenario),
  ...scenarios,
];

export const getScenarioDividers = (options: IGetScenarioDividersOptions) => {
  const { story, encounterSets, includeScenarios, includeCampaignIcon } = options;

  if (!includeScenarios) {
    return [];
  }

  const { icon } = story;
  const scenarios = getStoryScenarios(story);

  const campaignIcon = icon;

  return sortWith([ascend(({ number = Infinity }) => number)], scenarios).map(
    (scenario: IScenario) => {
      const { id, scenario_name, icon } = scenario;

      const sizeData = getScenarioSize({
        scenario,
        ...options,
      });

      return {
        ...sizeData,
        id: uniqId() + id,
        story,
        storyNumber: getStoryNumber(story),
        scenarioNumber: getScenarioNumber(id, scenario, story, encounterSets),
        name: scenario_name,
        icon,
        campaignIcon,
        type: DividerType.SCENARIO,
        displayCampaignIcon: includeCampaignIcon,
      };
    }
  );
};
