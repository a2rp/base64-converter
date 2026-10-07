import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/base64-converter/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
