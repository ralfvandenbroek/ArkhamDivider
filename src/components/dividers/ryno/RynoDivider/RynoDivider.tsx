import classNames from 'classnames';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { DividerText } from '../../common/DividerText/DividerText';
import S from './RynoDivider.module.scss';
import { useState } from 'react';
import { useStoryTranslation } from '@/shared/lib/hooks/useStoryTranslation';
import { images } from './images';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectBleed, selectCornerRadius } from '@/shared/store/features/print/print';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { CircleIcon } from '@/components/ui/icons/CircleIcon/CircleIcon';
import { useIconSelect } from '@/shared/lib/hooks/useIconSelect';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { getHeaderFilter, getSvgFilter } from './getHeaderFilter';
import { DividerType } from '@/shared/types/dividers';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { DividerCornerRadius } from '../../common/DividerCornerRadius/DividerCornerRadius';
import { DividerMenu } from '../../common/DividerMenu/DividerMenu';
import { isChallenge, isSideContent } from "@/shared/store/features/stories/criteria.ts";

type RynoDividerType = 'horizontal' | 'vertical' | 'verticalXL';

const isReturnToIcon = (icon: string) => {
  return icon.startsWith('return') || icon.match(/^rt[a-z]+$/) !== null ||
      ['blob_that_ate_everything_else', 'migo_incursion_2'].includes(icon);
};

export const RynoDivider = (props: DividerProps) => {
  const bleed = useAppSelector(selectBleed);
  const cornerRadius = useAppSelector(selectCornerRadius);
  const { name = '', story, id, storyNumber, scenarioNumber } = props;
  const { t } = useStoryTranslation(story);
  const layout = useAppSelector(selectLayout);

  const [icon, selectIcon] = useIconSelect({
    defaultIcon: props.icon,
  });

  const factionIcon = props.faction
    ? props.faction === 'mystic'
      ? 'mystic_alt'
      : props.faction
    : undefined;

  const [largeIcon, selectLargeIcon] = useIconSelect({
    defaultIcon: story && isChallenge(story) ? 'cardicons-parallel' : (props.campaignIcon ?? factionIcon),
  });

  const [campaignIcon, selectCampaignIcon] = useIconSelect({
    defaultIcon: story && isChallenge(story) ? 'cardicons-parallel' : props.campaignIcon,
  });

  const hasFaction = Boolean(props.faction);
  const hasXP = Boolean(props.xpCost);

  const svgFilter = getSvgFilter(props);

  const headerStyle = {
    filter: getHeaderFilter(props),
  };

  const [title, setTitle] = useState(name);
  const translatedName = ((scenarioNumber !== undefined ? scenarioNumber.toUpperCase() : '') + ' ' +
      t(name == 'Return Cult of Umôrdhoth' ? 'Cult of Umôrdhoth' : name)).trim();
  const titleInputClassName = classNames(S.titleInput);

  const dividerType = (layout.customParams?.type ?? 'horizontal') as RynoDividerType;

  const assets = images[dividerType];

  const storyTitle = story ? (
      isChallenge(story) ? t("Challenge Scenario") + ' ' + storyNumber :
      isSideContent(story) && story.code !== 'zbh' ? t("Standalone Adventure") + ' ' + storyNumber :
          storyNumber?.toLowerCase() + ' ' + t(story.name)
    ).trim() :'';

  const containerClassName = classNames(S.container, bleed && S.bleed, S[dividerType]);

  const isGenericFaction = props.faction && !['multiclass'].includes(props.faction);
  const factionImage = `/images/faction/${props.faction}.png`;

  const showCorner = !hasFaction || (hasFaction && !isGenericFaction);

  const returnToClass = icon && isReturnToIcon(icon) ? [S.return, S[icon]] : undefined;
  const returnToCampaignClass = campaignIcon && isReturnToIcon(campaignIcon) ? S.return : undefined;


  const iconScale = icon ? {
    // tcu
    'disappearance_at_the_twilight_estate': 0.9,
    'the_witching_hour': 0.9,
    // tfa
    'knyan': 0.9,
    // eoe
    'the_heart_of_madness': 0.85,
    'tekeli_li': 0.85,
    // tdc
    'pilgrims': 0.80,
  }[icon] : undefined;

  const isInvestigator = props.type === DividerType.INVESTIGATOR;

  return (
    <div className={containerClassName}>
      <DividerContent>
        <div className={S.assetsContainer}>
          <div className={S.assets}>
            {showCorner && <img className={S.corner} src={assets.corner} alt={title} />}
            {hasFaction && isGenericFaction && (
              <img className={S.factionIcon} src={factionImage} alt={props.faction} />
            )}
            {svgFilter}
            <img className={S.header} src={assets.header} alt={title} style={headerStyle} />
            <img className={S.body} src={assets.body} alt={title} />
          </div>
        </div>
        {story && (
          <div className={S.storyTitle}>
            <DividerText
              defaultValue={storyTitle}
              className={S.storyTitleContent}
              inputClassName={S.storyTitleInput}
              clearClassName={S.titleClear}
              fixedFontSize={false}
            />
          </div>
        )}
        {
          <div className={classNames(S.title, story && S.title_withStory)}>
            <DividerText
              stroke
              strokeClassName={classNames(titleInputClassName, S.textStroke)}
              defaultValue={translatedName}
              className={S.titleContent}
              inputClassName={titleInputClassName}
              onChange={setTitle}
              clearClassName={S.titleClear}
              fixedFontSize={false}
            />
          </div>
        }
        {showCorner && (
          <div className={classNames(S.icon, returnToClass)} onClick={selectIcon}>
            {icon && (
              <CircleIcon
                icon={icon}
                className={S.iconItem}
                containerClassName={S.iconContainer}
                scaleFactor={{
                  circled: iconScale || 0.97,
                  all: iconScale || 0.99,
                }}
              />
            )}
          </div>
        )}
        {largeIcon && (
          <div className={S.largeIcon} onClick={selectLargeIcon}>
            <Icon icon={largeIcon} />
          </div>
        )}
        {campaignIcon && !hasXP && !isInvestigator && (
          <div className={classNames(S.campaignIcon, returnToCampaignClass)} onClick={selectCampaignIcon}>
            <Icon icon={campaignIcon} />
          </div>
        )}
        {props.xpCost && (
          <div className={S.xp}>
            <img className={S.xpInner} src={images.xp} alt={props.xpCost.value} />
            <div className={S.xpValue}>{props.xpCost.value}</div>

            <div className={S.xpLevels}>
              {props.xpCost.level > 0 && (
                <Icon
                  icon={`ae_level_${props.xpCost.level}`}
                  className={classNames(S.lightLevel)}
                  scaleType={false}
                />
              )}
              {
                <Icon
                  icon={`ae_level_${props.xpCost.max ?? (props.xpCost.level || 5)}`}
                  className={classNames(S.maxLevel)}
                  scaleType={false}
                />
              }
            </div>
          </div>
        )}
        {cornerRadius && (
          <NotExportable>
            <DividerMenu id={id} className={S.menu} />
            <DividerCornerRadius className={S.cornerRadius} />
          </NotExportable>
        )}
      </DividerContent>
    </div>
  );
};
