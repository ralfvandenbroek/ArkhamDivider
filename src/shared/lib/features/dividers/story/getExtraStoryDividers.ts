import { IStory } from '@/shared/types/api';
import { DividerType, IDivider } from '@/shared/types/dividers';
import { uniqId } from '../../util/common';
import { getStoryNumber } from "./numbering";

type IGetExtraStoryDividersOptions = {
  story: IStory;
};

export const getExtraStoryDividers = (options: IGetExtraStoryDividersOptions) => {
  const { story } = options;

  if (story.code === 'tsk') {
    const concealedDivider: IDivider = {
      id: uniqId(),
      story,
      storyNumber: getStoryNumber(story),
      scenarioNumber: '',
      name: 'Concealed cards',
      icon: 'special_cards',
      campaignIcon: story.icon,
      type: DividerType.ENCOUNTER,
      customParams: {
        concealed: true,
      },
    };
    return [concealedDivider];
  }

  return [];
};
