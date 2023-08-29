import { BunPlugin, plugin } from "bun";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const postcssPlugin = {
  name: "postcss",
  async setup(build) {
    const { default: postcss } = await import("postcss");
    const { readFileSync } = await import("fs");

    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = readFileSync(args.path, "utf8");
      const result = await postcss([tailwindcss, autoprefixer]).process(css, {
        from: args.path,
      });
      const loader = `
              const style = document.createElement("style");
              style.textContent = ${JSON.stringify(result.css)};
              document.head.appendChild(style);
          `;

      return { contents: loader, loader: "js" };
    });
  },
} as BunPlugin;

export const BUILD_DIR = "build";

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: `./${BUILD_DIR}`,
  plugins: [postcssPlugin],
});
