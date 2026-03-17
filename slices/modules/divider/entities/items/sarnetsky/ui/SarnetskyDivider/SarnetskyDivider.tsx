import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getSarnetskyLayoutObjects, useSarnetskyDividerIcons } from "../../lib";
import type { SarnetskyDividerProps } from "../../model";
import { SarnetskyDividerBackground as Background } from "../SarnetskyDividerBackground";

export function SarnetskyDivider(props: SarnetskyDividerProps) {
	const { id } = props;
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const O = getSarnetskyLayoutObjects(layout);

	const mm = usePrintUnitCallback();

	const icons = useSarnetskyDividerIcons({ divider: props, objects: O });

	return (
		<Container>
			<Background {...props} />
			<Content>
				{icons.map(({ icon, setIcon, config }) => (
					<Icon
						key={config.id}
						dividerId={id}
						icon={icon}
						onClick={setIcon}
						top={mm(config.top)}
						right={mm(config.right)}
						fontSize={mm(config.fontSize)}
						{...config.params}
						sx={{
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 3,
							width: mm(config.width),
							height: mm(config.height),
							cursor: "pointer",
							"&:hover": {
								opacity: 0.5,
							},
						}}
					/>
				))}
			</Content>
		</Container>
	);
}
