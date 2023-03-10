import { Task } from "@/interfaces";
import { useReducer } from "react";

import { TaskContext, taskReducer } from "./";

export interface TaskState {
  tasks: Task[];
  isCardOpen: boolean;
}

const Task_INITIAL_STATE: TaskState = {
  isCardOpen: false,
  tasks: [
    {
      id: "1",
      name: "Mi primer tarea",
      estimatedPomodoros: 2,
      isCompleted: false,
    },
  ],
};

interface ProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, Task_INITIAL_STATE);

  const addTask = (task: Task) => {
    dispatch({
      type: "[Task] - Add task",
      payload: task,
    });
  };

  const toggleCard = () => {
    dispatch({
      type: "[Task] - Toggle card",
    });
  };

  const closeCard = () => {
    dispatch({
      type: "[Task] - Close card",
    });
  };

  const updateTask = (task: Task) => {
    dispatch({
      type: "[Task] - Update task",
      payload: task,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        toggleCard,
        closeCard,
        addTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
