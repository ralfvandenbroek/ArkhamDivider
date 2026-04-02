// import * as C from "./BandsList.components";
// import * as S from "./BandsList.styles";

import { Box, Container, Stack } from "@mui/material";
import { propEq } from "ramda";
import { useTranslation } from "react-i18next";
import { dividerCategories } from "@/modules/divider/entities/items";
import { Image, Row, SectionTitle } from "@/shared/ui";

const bandsCategories = dividerCategories.filter(propEq("band", "type"));

export function BandsList() {
	const { t } = useTranslation();
	return (
		<Container>
			<SectionTitle>{t("Bands")}</SectionTitle>
			<Stack gap={2}>
				<Row gap={2} flexWrap="wrap">
					{bandsCategories.map((category) => (
						<Box key={category.id}>
							<Image src={category.image} alt={category.name} width="100%" />
						</Box>
					))}
				</Row>
			</Stack>
		</Container>
	);
}
