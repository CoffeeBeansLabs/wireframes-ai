import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [preact(), tailwind()],
  output: "server",
  adapter: vercel(),
});