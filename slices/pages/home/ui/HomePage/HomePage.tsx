import Stack from "@mui/material/Stack";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";
import { DividerList } from "../DividerList";

export function HomePage() {
	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<DividerList />
			</Stack>
		</SingleColumnLayout>
	);
}
