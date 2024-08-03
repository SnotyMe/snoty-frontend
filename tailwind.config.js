/** @type {import('tailwindcss').Config} */

import { join } from "path";
import { skeleton } from "@skeletonlabs/skeleton/plugin"
import forms from "@tailwindcss/forms"
import * as themes from "@skeletonlabs/skeleton/themes"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{html,js,svelte,ts}",
      join(require.resolve('@skeletonlabs/skeleton-svelte'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {},
  },
  plugins: [
      forms,
      skeleton({
        themes: [ themes.cerberus ]
      })
  ],
  safelist: [
      {
          pattern: /bg-.*-500/,
          variants: ["after"]
      }
  ]
}
