import { useServerContext } from "context";
import { APIResponse, HttpMethod, HttpModule } from "types";

interface PendingPromise<T> extends Promise<T> {
  status: "pending";
}
interface FulfilledPromise<T> extends Promise<T> {
  status: "fulfilled";
  value: T;
}
interface RejectedPromise<T> extends Promise<T> {
  status: "rejected";
  reason: any;
}

type PromiseEx<T> =
  | Promise<T>
  | PendingPromise<T>
  | FulfilledPromise<T>
  | RejectedPromise<T>;

export function use<T>(promise: PromiseEx<T>) {
  if (!("status" in promise)) {
    (promise as PendingPromise<T>).status = "pending";
    promise.then(
      (result) => {
        (promise as FulfilledPromise<T>).status = "fulfilled";
        (promise as FulfilledPromise<T>).value = result;
      },
      (reason) => {
        (promise as RejectedPromise<T>).status = "rejected";
        (promise as RejectedPromise<T>).reason = reason;
      }
    );
    throw promise;
  }
  switch (promise.status) {
    case "pending":
      throw promise;
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw new Error("Invalid promise");
  }
}

export async function api<
  Method extends HttpMethod,
  Module extends HttpModule<Method>
>(responsePromise: Promise<Response>) {
  const response = await responsePromise;
  if (response.ok) {
    const data = await response.json();
    return data as APIResponse<Method, Module>;
  }
  throw new Error(response.statusText);
}

export function useApi<
  Method extends HttpMethod,
  Module extends HttpModule<Method>
>(method: Method, url: string) {
  const { origin, cache } = useServerContext();
  const key = `${method}@->${url}`;
  if (!cache.has(key)) {
    cache.set(key, api<Method, Module>(fetch(`${origin}${url}`)));
  }
  return use(cache.get(key)!) as APIResponse<Method, Module>;
}
