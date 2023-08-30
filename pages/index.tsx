import { Suspense } from "react";
import { Todo } from "ui";
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
          <Todo {...todo} />
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
        <script
          src="https://unpkg.com/htmx.org@1.9.5"
          integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
          defer
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js"
          defer
        ></script>
      </head>
      <body className="flex flex-col gap-3 items-center" hx-ext="morph">
        <h1 className="font-bold text-3xl">My page</h1>
        <Suspense fallback={null}>
          <TodoList />
        </Suspense>
      </body>
    </html>
  );
}
