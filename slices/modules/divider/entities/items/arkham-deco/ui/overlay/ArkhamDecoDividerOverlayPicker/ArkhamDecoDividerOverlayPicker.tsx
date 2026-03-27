import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DividerColorPicker as ColorPicker } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { ArkhamDecoDividerContext } from "../../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerOverlayPicker.styles";

export const ArkhamDecoDividerOverlayPicker = () => {
	const { divider } = useContext(ArkhamDecoDividerContext);
	const { t } = useTranslation();

	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getSx);

	return (
		<ColorPicker
			dividerId={divider.id}
			param="overlayColor"
			title={t("Background Color")}
			sx={sx}
		/>
	);
};
