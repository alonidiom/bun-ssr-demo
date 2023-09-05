export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

export const todos: Todo[] = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Learn Bun",
    completed: false,
  },
  {
    id: 3,
    title: "Profit",
    completed: false,
  },
];
