import { BUILD_DIR } from "build";
import { MatchedRoute, Server } from "bun";
import { ServerContext } from "context";
import { FunctionComponent } from "react";
import { renderToReadableStream } from "react-dom/server";
import { PageComponentProps } from "types";

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./pages",
});

async function renderPage(
  Component: FunctionComponent<PageComponentProps>,
  server: Server,
  request: Request,
  { kind, name, params, pathname, query }: MatchedRoute
) {
  const protocol: string = Reflect.get(server, "protocol");
  const { port, hostname } = server;
  const origin = `${protocol}://${hostname}:${port}`;
  const props = { kind, name, params, pathname, query, request };
  const stream = await renderToReadableStream(
    <ServerContext.Provider value={{ origin, cache: new Map() }}>
      <Component {...props} />
    </ServerContext.Provider>,
    !request.headers.has("hx-request")
      ? {
          bootstrapScripts: [`/${BUILD_DIR}/index.js`],
        }
      : {}
  );
  return new Response(stream, {
    headers: { "content-type": "text/html" },
  });
}

Bun.serve({
  async fetch(request, server) {
    const url = new URL(request.url);
    if (url.pathname.startsWith(`/${BUILD_DIR}/`)) {
      return new Response(Bun.file(`.${url.pathname}`));
    }
    const res = router.match(request);
    if (res) {
      const module = await import(res.filePath);
      if (module.default) {
        return renderPage(module.default, server, request, res);
      }
      const apiHandler = module[request.method.toUpperCase()];
      if (!apiHandler) return new Response("", { status: 405 });
      try {
        const apiResponse = await apiHandler(res, request);
        return new Response(JSON.stringify(apiResponse), {
          headers: { "content-type": "application/json" },
        });
      } catch (response) {
        return response as Response;
      }
    }

    return new Response("", { status: 404 });
  },
});
