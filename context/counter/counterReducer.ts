import { CounterState } from "./";

import { TModes } from "@/interfaces";

type CounterActionType =
  | { type: "[Counter] - Add elapsed second" }
  | { type: "[Counter] - Add pomodoro count" }
  | { type: "[Counter] - Change mode"; payload: TModes }
  | { type: "[Counter] - Decrease minutes" }
  | { type: "[Counter] - Decrease seconds" }
  | { type: "[Counter] - Finish Break" }
  | { type: "[Counter] - Finish Pomodoro" }
  | { type: "[Counter] - Load values from Localstorage"; payload: any }
  | { type: "[Counter] - Set Auto start Breaks"; payload: boolean }
  | { type: "[Counter] - Set Auto start Pomodoros"; payload: boolean }
  | { type: "[Counter] - Set Long Break interval"; payload: number }
  | { type: "[Counter] - Set Long Break timer"; payload: number }
  | { type: "[Counter] - Set Pomodoro timer"; payload: number }
  | { type: "[Counter] - Set seconds"; payload: number }
  | { type: "[Counter] - Set Short Break timer"; payload: number }
  | { type: "[Counter] - Toggle run" }
  | { type: "[Counter] - Update minutes"; payload: TModes };

export const counterReducer = (
  state: CounterState,
  action: CounterActionType
): CounterState => {
  switch (action.type) {
    case "[Counter] - Change mode":
      return {
        ...state,
        mode: action.payload,
        minutes: state.timers[action.payload],
        elapsedSeconds: 0,
        seconds: 0,
      };

    case "[Counter] - Toggle run":
      return {
        ...state,
        isRunning: !state.isRunning,
      };

    case "[Counter] - Decrease minutes":
      return {
        ...state,
        minutes: state.minutes - 1,
      };

    case "[Counter] - Decrease seconds":
      return {
        ...state,
        seconds: state.seconds - 1,
      };

    case "[Counter] - Set seconds":
      return {
        ...state,
        seconds: action.payload,
      };

    case "[Counter] - Add elapsed second":
      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1,
      };

    case "[Counter] - Add pomodoro count":
      return {
        ...state,
        pomodoroCount: state.pomodoroCount + 1,
      };

    case "[Counter] - Set Pomodoro timer": {
      return {
        ...state,
        timers: { ...state.timers, Pomodoro: action.payload },
      };
    }

    case "[Counter] - Set Short Break timer": {
      return {
        ...state,
        timers: { ...state.timers, "Short Break": action.payload },
      };
    }

    case "[Counter] - Set Long Break timer": {
      return {
        ...state,
        timers: { ...state.timers, "Long Break": action.payload },
      };
    }

    case "[Counter] - Set Long Break interval": {
      return {
        ...state,
        timers: { ...state.timers, LongBreakInterval: action.payload },
      };
    }

    case "[Counter] - Load values from Localstorage":
      return {
        ...state,
        ...action.payload,
      };

    case "[Counter] - Set Auto start Pomodoros":
      return {
        ...state,
        autoStartPomodoros: action.payload,
      };

    case "[Counter] - Set Auto start Breaks":
      return {
        ...state,
        autoStartBreaks: action.payload,
      };

    case "[Counter] - Update minutes":
      console.log(state);
      return {
        ...state,
        minutes: state.timers[action.payload],
      };

    default:
      return state;
  }
};
