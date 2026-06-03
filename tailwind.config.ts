import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false, // Disable Tailwind's default reset
  },
};

export default config;
