import { createContext } from "react";

import { TModes } from "@/interfaces";

interface Context {
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  elapsedSeconds: number;
  formattedTime: string;
  isRunning: boolean;
  minutes: number;
  mode: TModes;
  pomodoroCount: number;
  seconds: number;
  timers: { [key in TModes]: number };
  addElapsedSecond: () => void;
  addPomodoroCount: () => void;
  changeMode: (newMode: TModes) => void;
  decreaseCounter: () => void;
  decreaseSeconds: () => void;
  onFinish: () => void;
  setAutoStartBreaks: (value: boolean) => void;
  setAutoStartPomodoros: (value: boolean) => void;
  setLongBreakInterval: (newInterval: number) => void;
  setLongBreakTimer: (newTimer: number) => void;
  setPomodoroTimer: (newTimer: number) => void;
  setSeconds: (seconds: number) => void;
  setShortBreakTimer: (newTimer: number) => void;
  toggleRun: () => void;
  updateMinutes: () => void;
}

export const CounterContext = createContext({} as Context);
