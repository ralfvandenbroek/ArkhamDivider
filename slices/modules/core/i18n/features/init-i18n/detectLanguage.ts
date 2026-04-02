/**
 * Pick the first browser language that the app supports.
 * Handles BCP 47 tags (`en-US` → `en`) and keeps app codes (`zh_cn`) canonical.
 */
export const detectLanguage = (availableLanguages: string[]) => {
	const byLower = new Map(
		availableLanguages.map((code) => [code.toLowerCase(), code] as const),
	);

	const resolveTag = (tag: string): string | undefined => {
		const lower = tag.toLowerCase();
		const exact = byLower.get(lower);
		if (exact) {
			return exact;
		}

		const base = lower.split("-")[0];
		const fromBase = byLower.get(base);
		if (fromBase) {
			return fromBase;
		}

		if (base === "zh") {
			return byLower.get("zh_cn") ?? byLower.get("zh");
		}

		return undefined;
	};

	for (const tag of navigator.languages) {
		const match = resolveTag(tag);
		if (match) {
			return match;
		}
	}

	return undefined;
};
