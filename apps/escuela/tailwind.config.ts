// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  presets: [sharedConfig],
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
  ],
};

export default config;
