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
import { useArkhamDecoSxOptions } from "../../lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../model";
import { ArkhamDecoDividerBackgroundIcon as BackgroundIcon } from "../ArkhamDecoDividerBackgroundIcon";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext/ArkhamDecoDividerContext";
import { ArkhamDecoDividerFooter as Footer } from "../ArkhamDecoDividerFooter";
import { ArkhamDecoDividerHeader as Header } from "../ArkhamDecoDividerHeader";
import { ArkhamDecoDividerTitle } from "../ArkhamDecoDividerTitle";
import * as C from "./ArkhamDecoDivider.components";
import * as S from "./ArkhamDecoDivider.styles";

const backgroundUrl = `${arkhamDecoAssetUrl}/paper.avif`;

export function ArkhamDecoDivider(props: ArkhamDecoDividerProps) {
	const sxOptions = useArkhamDecoSxOptions(props);
	const { objects } = sxOptions;
	const getPrintSx = usePrintUnit(sxOptions);

	const layout = useAppSelector(selectLayout) as ArkhamDecoDividerLayout;
	const contentSx = getPrintSx(S.getContentSx);

	const bodySx = getPrintSx(S.getBodySx);
	const headerSx = getPrintSx(S.getHeaderSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const titleSx = getPrintSx(S.getTitleSx);

	return (
		<ArkhamDecoDividerContext.Provider
			value={{ divider: props, layout, sxOptions, objects }}
		>
			<Container>
				<DividerBackground src={backgroundUrl} />
				<Content sx={{ mixBlendMode: "multiply" }}>
					<Box sx={contentSx}>
						<Header sx={headerSx} />
						<ArkhamDecoDividerTitle sx={titleSx} />
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
