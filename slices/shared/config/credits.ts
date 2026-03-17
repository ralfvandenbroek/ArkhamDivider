import type { Author } from "../model";
import { getAssetUrl } from "../util";

export const FFGCredits: Author = {
	id: "ffg",
	name: "Fantasy Flight Games",
	primary: true,
	image: getAssetUrl("/images/brands/ffg.png"),
	contacts: [
		{
			id: "website",
			icon: "link",
			url: "https://www.fantasyflightgames.com/",
		},
		{
			id: "facebook",
			icon: "facebook",
			url: "http://www.facebook.com/FantasyFlightGames",
		},
		{
			id: "twitter",
			icon: "twitter",
			url: "http://www.twitter.com/ffgames",
		},
		{
			id: "instagram",
			icon: "instagram",
			url: "https://www.instagram.com/fantasyflightgames/",
		},
		{
			id: "youtube",
			icon: "youtube",
			url: "https://www.youtube.com/user/FantasyFlightStudio",
		},
	],
};

export const SarnetskyCredits: Author = {
	id: "sarnetsky",
	name: "Eugene Sarnetsky",
	image: getAssetUrl("/images/authors/sarnetsky.jpg"),
	donationUrl: {
		default: "https://www.tinkoff.ru/cf/8OT6GkH6KwE",
	},
	contacts: [
		{
			id: "telegram",
			icon: "telegram",
			url: "https://t.me/sarnetsky",
		},
		{
			id: "email",
			icon: "mail",
			url: "mailto:sarnetsky@gmail.com",
		},
	],
};
