import type { Todo as TodoItem } from "db";
import { patchTodo } from "services/todos";
import { PageComponentProps } from "types";
import { Todo } from "ui";
import { useAsyncValue } from "use";

export default function TodoItem(props: PageComponentProps) {
  const id = +props.params.id;
  switch (props.request.method) {
    case "PATCH": {
      const update = useAsyncValue(() => props.request.formData());
      const patch: Partial<TodoItem> = {};
      if (update.has("completed")) {
        patch.completed = update.get("completed") === "true";
      }
      if (update.has("title")) {
        patch.title = update.get("title") as string;
      }
      const todo = useAsyncValue(() => patchTodo(id, patch));
      return <Todo {...todo} />;
    }
    default:
      throw new Response("", { status: 405 });
  }
}
