import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	build: {
		modulePreload: {
			polyfill: false,
		},
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].[hash].module.js",
				chunkFileNames: "assets/[name].[hash].module.js",
			},
		},
	},
});
