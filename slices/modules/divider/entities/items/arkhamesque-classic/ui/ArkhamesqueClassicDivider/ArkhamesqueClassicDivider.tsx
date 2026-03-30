import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamesqueClassicManifest as positionManifest } from "../../config";
import {
	getDefaultArkhamesqueClassicBottomIcon as getDefaultBottomIcon,
	getArkhamesqueClassicImage as getImage,
	selectArkhamesqueClassicData,
	showArkhamesqueClassicBottomIcon as showBottomIcon,
	showArkhamesqueClassicIcon as showIcon,
} from "../../lib";
import type { ArkhamesqueClassicDividerProps } from "../../model";
import { ArkhamesqueClassicContext as Context } from "../ArkhamesqueClassicContext";
import { ArkhamesqueClassicTitle as Title } from "../ArkhamesqueClassicTitle/ArkhamesqueClassicTitle";
import * as S from "./ArkhamesqueClassicDivider.styles";

export function ArkhamesqueClassicDivider(
	props: ArkhamesqueClassicDividerProps,
) {
	const getPrintSx = usePrintUnit();
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const bottomIconSx = getPrintSx(S.getBottomIconSx);
	const titleSx = getPrintSx(S.getTitleSx);

	const data = useAppSelector(selectArkhamesqueClassicData);
	const background = getImage({
		divider: props,
		data,
	});

	const showLeftIcon = showIcon(props);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const [leftIcon, selectLeftIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: props.icon,
	});

	const defaultBottomIcon = getDefaultBottomIcon(props);

	const [bottomIcon, selectBottomIcon] = getDividerIcon({
		param: "bottomIcon",
		defaultIcon: defaultBottomIcon,
	});

	const showSecondaryIcon = showBottomIcon(props);

	return (
		<Context.Provider value={{ divider: props }}>
			<Container>
				{background && (
					<BleedView>
						<Image
							src={background}
							alt={props.id}
							sx={backgroundSx}
							crossOrigin="anonymous"
						/>
					</BleedView>
				)}
				<Content>
					<Title sx={titleSx} />
					{showLeftIcon && (
						<DividerIcon
							icon={leftIcon}
							sx={leftIconSx}
							scaleType="circle"
							onClick={selectLeftIcon}
							manifest={positionManifest}
						/>
					)}
					{showSecondaryIcon && (
						<DividerIcon
							icon={bottomIcon}
							sx={bottomIconSx}
							scaleType="circle"
							onClick={selectBottomIcon}
							manifest={positionManifest}
						/>
					)}
				</Content>
			</Container>
		</Context.Provider>
	);
}
