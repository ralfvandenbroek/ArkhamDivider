type CreateVips = typeof import("wasm-vips");
type VipsInstance = Awaited<ReturnType<CreateVips>>;

let vips: VipsInstance | null = null;

export const getVips = async (): Promise<VipsInstance> => {
	if (vips) {
		return vips;
	}
	const module = await import("wasm-vips");
	const Vips = module.default as CreateVips;
	vips = await Vips();
	return vips;
};
