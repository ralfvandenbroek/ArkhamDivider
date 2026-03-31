import {
	DividerBackground as Background,
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamStarterDividerBaseUrl as baseUrl } from "../../config";
import {
	get3mmDividerTitleObject,
	show3mmDividerIconCorner as showIconCorner,
} from "../../lib";
import type { ArkhamStarterDividerProps } from "../../model";
import { ArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import { ArkhamStarterDividerHeader as TopHeader } from "../ArkhamStarterDividerHeader";
import * as S from "./ArkhamStarterDivider.styles";

export function ArkhamStarterDivider(props: ArkhamStarterDividerProps) {
	const getPrintSx = usePrintUnit();
	const headerSx = getPrintSx(S.getHeaderSx);
	const iconCornerSx = getPrintSx(S.getIconCornerSx);
	const titleObject = get3mmDividerTitleObject(props);

	const shwoCorner = showIconCorner(props);

	return (
		<ArkhamStarterDividerContext.Provider
			value={{ divider: props, titleObject }}
		>
			<Container>
				<Background src={`${baseUrl}/background.avif`} />
				<BleedView>
					{shwoCorner && (
						<Image src={`${baseUrl}/iconCorner.avif`} sx={iconCornerSx} />
					)}
				</BleedView>
				<Content>
					<TopHeader sx={headerSx} />
				</Content>
			</Container>
		</ArkhamStarterDividerContext.Provider>
	);
}
