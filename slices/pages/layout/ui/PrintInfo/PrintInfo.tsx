import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { selectOrientedPageFormat } from "@/modules/print/shared/lib";
import {
	selectBleedEnabled,
	selectDoubleSidePrintEnabled,
} from "@/modules/print/shared/lib/store/print";
import { browser } from "@/shared/config/compatibility";
import { useAppSelector } from "@/shared/lib";

const A4_AREA_MM2 = 210 * 297;

function isBiggerThanA4Mm(size: { width: number; height: number }): boolean {
	return size.width * size.height > A4_AREA_MM2;
}

export function PrintInfo() {
	const { t } = useTranslation();
	const bleedEnabled = useAppSelector(selectBleedEnabled);
	const doubleSided = useAppSelector(selectDoubleSidePrintEnabled);
	const pageFormat = useAppSelector(selectOrientedPageFormat);

	const showDoubleSidedWithoutBleed =
		bleedEnabled === false && doubleSided === true;

	const isFirefox = browser?.name === "firefox";
	const showFirefoxLargePaperInfo =
		isFirefox && pageFormat ? isBiggerThanA4Mm(pageFormat.size.mm) : false;

	if (!showDoubleSidedWithoutBleed && !showFirefoxLargePaperInfo) {
		return null;
	}

	return (
		<Stack gap={1.5} maxWidth="sm" marginInline="auto">
			{showDoubleSidedWithoutBleed && (
				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography fontWeight={600}>
							{t("printInfo.doubleSidedNoBleed.title")}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography color="text.secondary">
							{t("printInfo.doubleSidedNoBleed.body")}
						</Typography>
					</AccordionDetails>
				</Accordion>
			)}

			{showFirefoxLargePaperInfo && (
				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography fontWeight={600}>
							{t("printInfo.firefoxLargePaper.title")}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography color="text.secondary">
							{t("printInfo.firefoxLargePaper.body")}
						</Typography>
					</AccordionDetails>
				</Accordion>
			)}
		</Stack>
	);
}
