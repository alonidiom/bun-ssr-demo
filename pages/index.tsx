import { Suspense } from "react";
import { getTodos } from "services/todos";
import { Todo, Document } from "ui";
import { useAsyncValue } from "use";

function TodoList() {
  const todos = useAsyncValue(getTodos);
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
    <Document title="My todo list" className="flex flex-col gap-3 items-center">
      <h1 className="font-bold text-3xl">My todo list</h1>
      <form
        hx-post="/api/todos"
        hx-target="next ul"
        hx-swap="afterbegin"
        className="flex gap-2 max-w-lg w-full"
        {...{
          "hx-on::after-request": "this.reset()",
        }}
      >
        <input
          type="text"
          name="title"
          className="rounded-lg p-2 border border-gray-300 flex-1"
          placeholder="What needs to be done?"
          required
        />

        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">
          Add
        </button>
      </form>
      <Suspense fallback={null}>
        <TodoList />
      </Suspense>
    </Document>
  );
}
