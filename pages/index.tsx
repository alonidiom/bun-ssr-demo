import { Suspense } from "react";
import { useApi } from "use";

function TodoList() {
  const todos = useApi<"GET", typeof import("pages/api/todos")>(
    "GET",
    "/api/todos"
  );
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              data-id={todo.id}
              defaultChecked={todo.completed}
            />
            {todo.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function Root() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My page</title>
      </head>
      <body>
        <h1>My page</h1>
        <Suspense fallback={null}>
          <TodoList />
        </Suspense>
      </body>
    </html>
  );
}
