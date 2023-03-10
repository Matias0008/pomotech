import { TaskState } from "./";

import { Task } from "@/interfaces";

type TaskActionType =
  | { type: "[Task] - Toggle card" }
  | { type: "[Task] - Close card" }
  | { type: "[Task] - Add task"; payload: Task }
  | { type: "[Task] - Remove task" }
  | { type: "[Task] - Update task"; payload: Task };

export const taskReducer = (
  state: TaskState,
  action: TaskActionType
): TaskState => {
  switch (action.type) {
    case "[Task] - Toggle card":
      return {
        ...state,
        isCardOpen: !state.isCardOpen,
      };

    case "[Task] - Close card":
      return {
        ...state,
        isCardOpen: false,
      };

    case "[Task] - Add task":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "[Task] - Update task":
      const { id } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === id) {
            return action.payload;
          }
          return task;
        }),
      };

    default:
      return state;
  }
};
