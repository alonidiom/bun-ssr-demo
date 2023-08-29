import { todos } from "db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return todos;
}
