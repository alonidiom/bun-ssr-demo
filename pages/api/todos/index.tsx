import { createTodo } from "services/todos";
import { PageComponentProps } from "types";
import { Todo } from "ui";
import { useAsyncValue } from "use";

export default function Todos(props: PageComponentProps) {
  switch (props.request.method) {
    case "POST": {
      const body = useAsyncValue(() => props.request.formData());
      if (!body.has("title")) {
        throw new Response("", { status: 400 });
      }
      const todo = useAsyncValue(() =>
        createTodo({ title: body.get("title") as string, completed: false })
      );
      return <Todo {...todo} />;
    }
    default:
      throw new Response("", { status: 405 });
  }
}
