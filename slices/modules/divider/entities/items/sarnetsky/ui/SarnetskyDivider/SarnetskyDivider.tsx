import { DividerContainer as Container } from "@/modules/divider/entities/ui";
import type { SarnetskyDividerProps } from "../../model";
import { SarnetskyDividerBackground } from "../SarnetskyDividerBackground";

export function SarnetskyDivider(props: SarnetskyDividerProps) {
	return (
		<Container>
			<SarnetskyDividerBackground {...props} />
		</Container>
	);
}
