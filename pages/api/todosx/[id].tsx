import { todos } from "db";
import { PageComponentProps } from "types";
import { Todo } from "ui";
import { use } from "use";

const cache = new WeakMap<Request, Promise<FormData>>();

export default function TodoItem(props: PageComponentProps) {
  const id = +props.params.id;
  const todo = todos.find((todo) => todo.id === id);
  if (!cache.has(props.request)) {
    cache.set(props.request, props.request.formData());
  }
  const change = use(cache.get(props.request)!);
  if (!todo) return null;
  if (change.has("completed")) {
    todo.completed = change.get("completed") === "true";
  }
  if (change.has("title")) {
    todo.title = change.get("title") as string;
  }

  return <Todo {...todo} />;
}
