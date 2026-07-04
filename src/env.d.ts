/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="./three-lens-distortion.d.ts" />

interface Window {
	__theme?: {
		toggleTheme: () => void;
	};
}
