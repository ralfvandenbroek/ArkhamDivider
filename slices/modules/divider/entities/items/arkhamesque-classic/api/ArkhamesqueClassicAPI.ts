const baseUrl = import.meta.env.VITE_ARKHAMESQUE_URL;

export const ArkhamesqueClassicAPI = {
	baseUrl,
	getImageUrl: async (segments: string[]) => {
		const path = segments.filter(Boolean).join("/");
		return `${baseUrl}/${path}.jpg`;
	},
	getData: async () => {
		const response = await fetch(`/data/arkhamesque-classic.json`);
		return response.json();
	},
};
