import { Suspense } from "react";
import { useApi } from "use";

function TodoList() {
  const todos = useApi<"GET", typeof import("pages/api/todos")>(
    "GET",
    "/api/todos"
  );
  return (
    <ul className="bg-gray-200 rounded-lg p-4 max-w-lg w-full">
      {todos.map((todo) => (
        <li key={todo.id}>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="rounded text-green-500"
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
      <body className="flex flex-col gap-3 items-center">
        <h1 className="font-bold text-3xl">My page</h1>
        <Suspense fallback={null}>
          <TodoList />
        </Suspense>
      </body>
    </html>
  );
}
