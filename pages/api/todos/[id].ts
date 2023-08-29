import { todos } from "db";
import { ApiHandler } from "types";

export const PATCH: ApiHandler = async ({ params: { id } }, request) => {
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    throw new Response("", { status: 404 });
  }
  Object.assign(todo, await request.json());
  return todo;
};
