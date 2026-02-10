import classNames from 'classnames';
import { Guide } from '@/components';
import { GuideType } from '@/shared/types/print';
import { PropsWithClassName } from '@/shared/types/util';
import S from './Guides.module.scss';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectCropMarks } from '@/shared/store/features/print/print';
import { selectExport } from '@/shared/store/features/app/app';

type GuideConfig = GuideType | false;

export type GuidesProps = PropsWithClassName & {
  topLeft?: GuideConfig;
  topRight?: GuideConfig;
  bottomLeft?: GuideConfig;
  bottomRight?: GuideConfig;
  contentClassName?: string;
  guideClassName?: string;
};

export const Guides = ({
  className,
  guideClassName,
  topLeft = "outset-corner-tl",
  topRight = "outset-corner-tr",
  bottomLeft = "outset-corner-bl",
  bottomRight = "outset-corner-br",
}: GuidesProps) => {
  const show = useAppSelector(selectCropMarks);
  const isExport = useAppSelector(selectExport);

  if (isExport) {
    return null;
  }

  return (
    <div className={classNames(S.container, className)}>
      {topLeft && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_topLeft)}
          type={topLeft}
          show={show}
        />
      )}
      {topRight && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_topRight)}
          type={topRight}
          show={show}
        />
      )}
      {bottomLeft && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_bottomLeft)}
          type={bottomLeft}
          show={show}
        />
      )}
      {bottomRight && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_bottomRight)}
          type={bottomRight}
          show={show}
        />
      )}
    </div>
  );
};
