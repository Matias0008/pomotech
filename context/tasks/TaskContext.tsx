import { createContext } from "react";

import { Task } from "@/interfaces";

interface Context {
  tasks: Task[];
  isCardOpen: boolean;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleCard: () => void;
  closeCard: () => void;
}

export const TaskContext = createContext({} as Context);
