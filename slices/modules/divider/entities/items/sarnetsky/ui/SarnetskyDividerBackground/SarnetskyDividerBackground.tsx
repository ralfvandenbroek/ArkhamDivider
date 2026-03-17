import type { BoxProps } from "@mui/material";
import type { SarnetskyDividerProps } from "../../model";
import { SarnetskyDividerBlankImage as BlankImage } from "./SarnetskyDividerBlankImage";
import { SarnetskyDividerPlayerBackground as PlayerBackground } from "./SarnetskyDividerPlayerBackground";
import { SarnetskyDividerScenarioBackground as ScenarioBackground } from "./SarnetskyDividerScenarioBackground";

type SarnetskyDividerBackgroundProps = BoxProps & SarnetskyDividerProps;

export function SarnetskyDividerBackground(
	props: SarnetskyDividerBackgroundProps,
) {
	const { side, params } = props;
	const showBlankImage = params?.blankBackSide && side === "back";

	if (showBlankImage) {
		return <BlankImage {...props} />;
	}
	switch (props.type) {
		case "player":
		case "investigator":
			return <PlayerBackground {...props} />;
		case "scenario":
		case "campaign":
		case "encounter":
			return <ScenarioBackground {...props} />;
	}
}
