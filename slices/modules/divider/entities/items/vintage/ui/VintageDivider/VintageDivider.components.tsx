import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { vintageDividerBaseUrl as baseUrl } from "../../config/common";
import { useVintageDividerContext } from "../VintageDividerContext/VintageDividerContext";
import * as S from "./VintageDivider.styles";

const asset = prefix(baseUrl);

const bodyMap: Record<string, string> = {
	vintage: "/body.png",
	"vintage-large": "/body_large.png",
	"vintage-vertical": "/body_vertical.png",
};

export const Body = () => {
	const { layout } = useVintageDividerContext();
	const id = bodyMap[layout.id];

	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getBodySx);

	return <Image src={asset(id)} sx={sx} />;
};
