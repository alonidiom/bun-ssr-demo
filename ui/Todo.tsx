import { FunctionComponent } from "react";

export interface TodoProps {
  id: number;
  completed: boolean;
  title: string;
}

export const Todo: FunctionComponent<TodoProps> = ({
  id,
  completed,
  title,
}) => (
  <label className="flex items-center gap-1">
    <input
      type="checkbox"
      className="rounded text-green-500"
      data-id={id}
      defaultChecked={completed}
      hx-patch={`/api/todosx/${id}`}
      hx-vals={`js:{completed: ${!completed}}`}
      hx-swap="morph"
      hx-target="closest label"
    />
    {title}
  </label>
);
