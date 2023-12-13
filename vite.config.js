import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

// https://vitejs.dev/config/

dotenv.config();

export default defineConfig({
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    plugins: [
        vue({
            jsx: true,
        }),
    ],
});
