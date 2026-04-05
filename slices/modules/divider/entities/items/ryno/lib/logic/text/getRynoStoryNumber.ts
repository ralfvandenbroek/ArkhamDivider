import {
	isChallengeStory,
	isReturnPack,
	isSideContent,
} from "@/modules/story/shared/lib";
import type { Story } from "@/modules/story/shared/model";

const getChallengeNumber = (story: Story) => {
	return (
		[
			"rod",
			"aon",
			"bad",
			"btb",
			"rtr",
			"otr",
			"ltr",
			"ptr",
			"rop",
			"hfa",
			"pap",
			"aof",
			"enc",
		].indexOf(story.code) + 1 || ""
	).toString();
};

const getStandaloneNumber = (story: Story) => {
	return (
		[
			"cotr",
			"coh",
			"lol",
			"guardians",
			"hotel",
			"blob",
			"wog",
			"mtt",
			"fof",
			"blbe",
			"tmg",
			"film_fatale",
		].indexOf(story.code) + 1 || ""
	).toString();
};

const getReturnToNumber = (story: Story) => {
	const number = (
		["rtnotz", "rtdwl", "rtptc", "rttfa", "rttcu", "zrttde", "zrttic"].indexOf(
			story.code,
		) + 1 || ""
	).toString();
	return number ? `${number}B` : number;
};

export const getRynoStoryNumber = (story: Story) => {
	return isChallengeStory(story)
		? getChallengeNumber(story)
		: isSideContent(story)
			? getStandaloneNumber(story)
			: isReturnPack(story)
				? getReturnToNumber(story)
				: (story.position || "").toString();
};
