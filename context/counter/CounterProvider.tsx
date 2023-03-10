import { useEffect, useReducer } from "react";

import { CounterContext, counterReducer } from "./";
import { TModes } from "@/interfaces";

export interface CounterState {
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  elapsedSeconds: number;
  isRunning: boolean;
  minutes: number;
  mode: TModes;
  pomodoroCount: number;
  seconds: number;
  timers: { [key in TModes]: number };
}

const Counter_INITIAL_STATE: CounterState = {
  autoStartBreaks: false,
  autoStartPomodoros: false,
  elapsedSeconds: 0,
  isRunning: false,
  minutes: 1, // Pomodoro timer
  mode: "Pomodoro",
  pomodoroCount: 1,
  seconds: 0,
  timers: {
    Pomodoro: 1,
    "Short Break": 2,
    "Long Break": 3,
    LongBreakInterval: 4,
  },

  //* ==> La variable "minutes" hace referencia al minuto dependiendo el modo en el que estemos.
};

interface ProviderProps {
  children: React.ReactNode;
}

export const CounterProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, Counter_INITIAL_STATE);

  useEffect(() => {
    let timers = localStorage.getItem("timers");
    let autoStartPomodoros = localStorage.getItem("autoStartPomodoros");
    let autoStartBreaks = localStorage.getItem("autoStartBreaks");
    const localStorageItems = { timers, autoStartPomodoros, autoStartBreaks };

    if (timers && autoStartPomodoros && autoStartBreaks) {
      Object.keys(localStorageItems).forEach((key, index) => {
        (localStorageItems as any)[key] = JSON.parse(
          (localStorageItems as any)[key]
        );
      });

      dispatch({
        type: "[Counter] - Load values from Localstorage",
        payload: localStorageItems,
      });

      dispatch({
        type: "[Counter] - Update minutes",
        payload: state.mode,
      });
    }
  }, [state.mode]);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(state.timers));
    localStorage.setItem(
      "autoStartPomodoros",
      JSON.stringify(state.autoStartPomodoros)
    );
    localStorage.setItem(
      "autoStartBreaks",
      JSON.stringify(state.autoStartBreaks)
    );
  }, [state.timers, state.autoStartBreaks, state.autoStartPomodoros]);

  const changeMode = (newMode: TModes) => {
    dispatch({
      type: "[Counter] - Change mode",
      payload: newMode,
    });
  };

  const toggleRun = () => {
    dispatch({
      type: "[Counter] - Toggle run",
    });
  };

  const decreaseCounter = () => {
    dispatch({ type: "[Counter] - Decrease minutes" });
  };

  const decreaseSeconds = () => {
    dispatch({ type: "[Counter] - Decrease seconds" });
  };

  const addElapsedSecond = () => {
    dispatch({ type: "[Counter] - Add elapsed second" });
  };

  const setSeconds = (seconds: number) => {
    dispatch({
      type: "[Counter] - Set seconds",
      payload: seconds,
    });
  };

  const addPomodoroCount = () => {
    dispatch({
      type: "[Counter] - Add pomodoro count",
    });
  };

  const onFinish = () => {
    const {
      mode,
      pomodoroCount,
      timers: { LongBreakInterval },
    } = state;

    switch (mode) {
      case "Pomodoro":
        if (pomodoroCount % LongBreakInterval === 0) {
          return changeMode("Long Break");
        }
        return changeMode("Short Break");
      default:
        return changeMode("Pomodoro");
    }
  };

  const setPomodoroTimer = (newTimer: number) => {
    dispatch({ type: "[Counter] - Set Pomodoro timer", payload: newTimer });
  };

  const setShortBreakTimer = (newTimer: number) => {
    dispatch({ type: "[Counter] - Set Short Break timer", payload: newTimer });
  };

  const setLongBreakTimer = (newTimer: number) => {
    dispatch({ type: "[Counter] - Set Long Break timer", payload: newTimer });
  };

  const setLongBreakInterval = (newInterval: number) => {
    dispatch({
      type: "[Counter] - Set Long Break interval",
      payload: newInterval,
    });
  };

  const setAutoStartPomodoros = (value: boolean) => {
    dispatch({
      type: "[Counter] - Set Auto start Pomodoros",
      payload: value,
    });
  };

  const setAutoStartBreaks = (value: boolean) => {
    dispatch({
      type: "[Counter] - Set Auto start Breaks",
      payload: value,
    });
  };

  const updateMinutes = () => {
    dispatch({
      type: "[Counter] - Update minutes",
      payload: state.mode,
    });
  };

  const formattedMinutes =
    state.minutes < 10 ? `0${state.minutes}` : state.minutes;
  const formattedSeconds =
    state.seconds < 10 ? `0${state.seconds}` : state.seconds;
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

  return (
    <CounterContext.Provider
      value={{
        ...state,
        addElapsedSecond,
        addPomodoroCount,
        changeMode,
        decreaseCounter,
        decreaseSeconds,
        formattedTime,
        onFinish,
        setAutoStartBreaks,
        setAutoStartPomodoros,
        setLongBreakInterval,
        setLongBreakTimer,
        setPomodoroTimer,
        setSeconds,
        setShortBreakTimer,
        toggleRun,
        updateMinutes,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
