import Stack from "@mui/material/Stack";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";
import { BandsList } from "../BandsList";
import { DividerList } from "../DividerList";
import { IconsDownload } from "../IconsDownload";
import { InvestigatorTokensPreview } from "../InvestigatorTokensPreview";

export function HomePage() {
	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<DividerList />
				<BandsList />
				<InvestigatorTokensPreview />
				<IconsDownload />
			</Stack>
		</SingleColumnLayout>
	);
}
