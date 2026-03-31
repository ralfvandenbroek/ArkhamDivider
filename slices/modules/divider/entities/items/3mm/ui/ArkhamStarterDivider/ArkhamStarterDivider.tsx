import {
	DividerBackground as Background,
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { arkhamStarterDividerBaseUrl as baseUrl } from "../../config";
import {
	get3mmDividerTitleObject,
	show3mmDividerIconCorner as showIconCorner,
} from "../../lib";
import type { ArkhamStarterDividerProps } from "../../model";
import { ArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import {
	ArkhamStarterDividerSideHeader as SideHeader,
	ArkhamStarterDividerHeader as TopHeader,
} from "../header";
import * as C from "./ArkhamStarterDivider.components";
import * as S from "./ArkhamStarterDivider.styles";

export function ArkhamStarterDivider(props: ArkhamStarterDividerProps) {
	const getPrintSx = usePrintUnit();
	const headerSx = getPrintSx(S.getHeaderSx);
	const sideHeaderSx = getPrintSx(S.getSideHeaderSx);
	const titleObject = get3mmDividerTitleObject(props);

	const shwoCorner = showIconCorner(props);

	return (
		<ArkhamStarterDividerContext.Provider
			value={{ divider: props, titleObject }}
		>
			<Container>
				<Background src={`${baseUrl}/background.avif`} />
				<BleedView>{shwoCorner && <C.Corners />}</BleedView>
				<Content>
					<TopHeader sx={headerSx} />
					<SideHeader sx={sideHeaderSx} />
				</Content>
			</Container>
		</ArkhamStarterDividerContext.Provider>
	);
}
