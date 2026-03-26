import { Box } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
	DividerBackground,
} from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { arkhamDecoAssetUrl } from "../../config";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../model";
import { ArkhamDecoDividerBackgroundIcon as BackgroundIcon } from "../ArkhamDecoDividerBackgroundIcon/ArkhamDecoDividerBackgroundIcon";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext/ArkhamDecoDividerContext";
import { ArkhamDecoDividerFooter as Footer } from "../ArkhamDecoDividerFooter";
import * as C from "./ArkhamDecoDivider.components";
import * as S from "./ArkhamDecoDivider.styles";

const backgroundUrl = `${arkhamDecoAssetUrl}/paper.avif`;

export function ArkhamDecoDivider(props: ArkhamDecoDividerProps) {
	const getPrintSx = usePrintUnit();
	const layout = useAppSelector(selectLayout) as ArkhamDecoDividerLayout;
	const contentSx = getPrintSx(S.getContentSx);
	const bodySx = getPrintSx(S.getBodySx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);

	return (
		<ArkhamDecoDividerContext.Provider
			value={{ divider: props, layout: layout }}
		>
			<Container>
				<DividerBackground src={backgroundUrl} />
				<Content>
					<Box sx={contentSx}>
						<Box sx={bodySx}>
							<C.SideBorder position="left" />
							<C.SideBorder position="right" />
							<BackgroundIcon sx={backgroundIconSx} />
						</Box>

						<Footer />
					</Box>
				</Content>
			</Container>
		</ArkhamDecoDividerContext.Provider>
	);
}
