import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { useVintageDividerSxOptions } from "../../lib/hooks";
import type { VintageDividerLayout, VintageDividerProps } from "../../model";
import {
	VintageDividerTitle as Title,
	VintageDividerTopTitle as TopTitle,
} from "../text";
import { VintageDividerContext } from "../VintageDividerContext";
import * as C from "./VintageDivider.components";
import * as S from "./VintageDivider.styles";

export function VintageDivider(props: VintageDividerProps) {
	const layout = useAppSelector(selectLayout) as VintageDividerLayout;

	const sxOptions = useVintageDividerSxOptions();

	const getPrintSx = usePrintUnit(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);

	const menuSx = getPrintSx(S.getMenuSx);
	const titleSx = getLocaleSx(S.getTitleSx);
	const topTitleSx = getLocaleSx(S.getTopTitleSx);

	return (
		<VintageDividerContext.Provider
			value={{ divider: props, layout, sxOptions }}
		>
			<Container>
				<BleedView>
					<C.Body />
				</BleedView>
				<Content hideBorderRadius>
					<TopTitle sx={topTitleSx} />
					<Title sx={titleSx} />
					<Menu dividerId={props.id} sx={menuSx} />
				</Content>
			</Container>
		</VintageDividerContext.Provider>
	);
}
