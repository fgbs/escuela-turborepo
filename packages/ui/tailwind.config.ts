import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: ["./src/**/*.tsx"],
  prefix: "ui-",
  presets: [sharedConfig],
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
  ],
};

export default config;
