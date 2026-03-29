import { rgbTuple2Hex } from "@/modules/core/color/shared/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerColorPicker,
	DividerContent,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
// import * as C from "./RynoDivider.components";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import {
	getRynoDividerDefaultHeaderColor,
	getRynoDividerDefaultRightIcon,
} from "../../lib";
import { useRynoDividerImages, useRynoDividerSxOptions } from "../../lib/hooks";
import type { RynoDividerProps } from "../../model";
import { RynoDividerHeader as Header } from "../RynoDividerHeader";
import * as C from "./RynoDivider.components";
import * as S from "./RynoDivider.styles";

export function RynoDivider(props: RynoDividerProps) {
	const { layoutType, type } = props;
	const sxOptions = useRynoDividerSxOptions();

	const images = useRynoDividerImages(type);
	const getPrintSx = usePrintUnit(sxOptions);
	const bodySx = getPrintSx(S.getBodySx);
	const cornerSx = getPrintSx(S.getCornerSx);
	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const rightIconSx = getPrintSx(S.getRightIconSx);
	const headerColorSx = getPrintSx(S.getHeaderColorSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);

	const getDividerIcon = useDividerIcon({ dividerId: props.id });
	const [leftIcon, selectLeftIcon] = getDividerIcon({
		param: "leftIcon",
		defaultIcon: props.icon,
	});

	const defaultRightIcon = getRynoDividerDefaultRightIcon(props);
	const [rightIcon, selectRightIcon] = getDividerIcon({
		param: "rightIcon",
		defaultIcon: defaultRightIcon,
	});

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "backgroundIcon",
		defaultIcon: props.icon,
	});

	const defaultHeaderRGBColor = getRynoDividerDefaultHeaderColor(props);
	const defaultHeaderColor =
		defaultHeaderRGBColor && rgbTuple2Hex(defaultHeaderRGBColor);

	return (
		<Container>
			<BleedView>
				<Image src={images.body} sx={bodySx} />
				<C.Header src={images.header} divider={props} />
				<Image src={images.corner} sx={cornerSx} />
			</BleedView>
			<DividerContent>
				{layoutType === "scenario" && (
					<>
						<Icon
							icon={leftIcon}
							sx={leftIconSx}
							scaleType="circle"
							onClick={selectLeftIcon}
						/>
						{type !== "campaign" && (
							<Icon
								icon={rightIcon}
								sx={rightIconSx}
								onClick={selectRightIcon}
							/>
						)}
					</>
				)}
				<Icon
					icon={backgroundIcon}
					sx={backgroundIconSx}
					onClick={selectBackgroundIcon}
				/>

				<Header divider={props} />
				<DividerColorPicker
					dividerId={props.id}
					param="headerColor"
					defaultColor={defaultHeaderColor}
					sx={headerColorSx}
				/>
				<DividerMenu dividerId={props.id} sx={menuSx} />
			</DividerContent>
		</Container>
	);
}
