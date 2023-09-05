import * as db from "db";

export const getTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return db.todos;
};

export const getTodo = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return db.todos.find((todo) => todo.id === id);
};

export const patchTodo = async (id: number, todoPatch: Partial<db.Todo>) => {
  const todo = await getTodo(id);
  if (!todo) {
    throw new Response(null, { status: 404 });
  }
  Object.assign(todo, todoPatch);
  return todo;
};

export const createTodo = async (todo: Omit<db.Todo, "id">) => {
  const newTodo = { ...todo, id: db.todos.length + 1 };
  db.todos.unshift(newTodo);
  return newTodo;
};
