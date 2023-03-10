import { TModes } from "./interfaces";

export const VALID_MODES = ["Pomodoro", "Short Break", "Long Break"];
export const USM_VALID_MODES = ["Pomo", "Short", "Long"];

export const POMODORO_TIMER = 25;
// Number(localStorage.getItem("pomodoroTimer")) || 25;
export const SHORT_BREAK_TIMER = 1;
export const LONG_BREAK_TIMER = 1;
export const LONG_BREAK_INTERVAL = 4;

type mapKeys = { [key in TModes]: number };

const map: mapKeys = {
  Pomodoro: POMODORO_TIMER,
  "Short Break": SHORT_BREAK_TIMER,
  "Long Break": LONG_BREAK_TIMER,
};

export const getTimer = (mode: TModes) => {
  return map[mode];
};
