import { MatchedRoute } from "bun";

export type PageComponentProps = Pick<
  MatchedRoute,
  "kind" | "name" | "params" | "pathname" | "query"
> & { request: Request };

export type ApiHandler = (
  match: MatchedRoute,
  request: Request
) => Promise<any> | any;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type HttpModule<Method extends HttpMethod> = {
  [key in Method]: (...args: any[]) => Promise<any> | any;
};

export type APIResponse<
  Method extends HttpMethod,
  ApiModule extends HttpModule<Method>
> = Awaited<ReturnType<Awaited<ApiModule>[Method]>>;
