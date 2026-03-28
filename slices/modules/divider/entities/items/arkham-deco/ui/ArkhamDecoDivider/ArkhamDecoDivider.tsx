import { Box } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { arkhamDecoAssetUrl } from "../../config";
import { useArkhamDecoSxOptions } from "../../lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../model";
import { ArkhamDecoDividerBackgroundIcon as BackgroundIcon } from "../ArkhamDecoDividerBackgroundIcon";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext";
import {
	ArkhamDecoDividerFooter as Footer,
	ArkhamDecoDividerHeader as Header,
	ArkhamDecoDividerTitle as Title,
} from "../layout";
import {
	ArkhamDecoDividerOverlay as Overlay,
	ArkhamDecoDividerOverlayPicker as OverlayPicker,
} from "../overlay";
import * as C from "./ArkhamDecoDivider.components";
import * as S from "./ArkhamDecoDivider.styles";

const backgroundUrl = `${arkhamDecoAssetUrl}/paper.avif`;

export function ArkhamDecoDivider(props: ArkhamDecoDividerProps) {
	const sxOptions = useArkhamDecoSxOptions(props);
	const { objects } = sxOptions;
	const getPrintSx = usePrintUnit(sxOptions);
	const layout = useAppSelector(selectLayout) as ArkhamDecoDividerLayout;
	const { orientation } = layout;
	const { singleSide = false } = useAppSelector(selectScenarioParams);
	const contentSx = getPrintSx(S.getContentSx);

	const bodySx = getPrintSx(S.getBodySx);
	const headerSx = getPrintSx(S.getHeaderSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const titleSx = getPrintSx(S.getTitleSx);

	const showContent = !singleSide || props.side === "front";

	return (
		<ArkhamDecoDividerContext.Provider
			value={{
				divider: props,
				layout,
				sxOptions,
				objects,
				singleSide,
			}}
		>
			<Container>
				{layout.color && <Background src={backgroundUrl} />}
				<Overlay />
				<Content sx={{ mixBlendMode: "multiply" }} hidden={!showContent}>
					<OverlayPicker />
					<Box sx={contentSx}>
						<Header sx={headerSx} />
						<Title sx={titleSx} />
						<Box sx={bodySx}>
							<C.SideBorder position="left" />
							<C.SideBorder position="right" />
							<C.Scratches orientation={orientation} />
							<BackgroundIcon sx={backgroundIconSx} />
						</Box>

						<Footer />
					</Box>
				</Content>
			</Container>
		</ArkhamDecoDividerContext.Provider>
	);
}
