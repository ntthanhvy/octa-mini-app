declare global {
	interface Window {
		__ENV__: {
			API_BASE_URL: string;
			RESIZED_IMG_URL: string;
			IMG_URL: string;
		};
	}
}

export {};
