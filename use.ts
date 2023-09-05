import { useServerContext } from "context";
import { useId } from "react";
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

const requestCache = new WeakMap<Request, Record<string, Promise<any>>>();

export function useAsyncValue<T>(promiseFactory: () => Promise<T>): T {
  const { request } = useServerContext();
  const cacheKey = useId();
  if (!requestCache.has(request)) {
    requestCache.set(request, {});
  }
  const cache = requestCache.get(request)!;
  if (!cache[cacheKey]) {
    cache[cacheKey] = promiseFactory();
  }
  return use(cache[cacheKey]);
}
