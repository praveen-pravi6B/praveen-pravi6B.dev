import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * The v3 editorial app is a self-contained Vue build. It is emitted to
 * `dist-v3/` with base `/v3/`, then `scripts/build-deploy.mjs` copies it to
 * `dist/v3/` next to the frozen v1/v2 snapshots.
 */
export default defineConfig({
  root: fileURLToPath(new URL("./v3", import.meta.url)),
  base: "/v3/",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [vue()],
  build: {
    outDir: fileURLToPath(new URL("./dist-v3", import.meta.url)),
    emptyOutDir: true,
  },
});
