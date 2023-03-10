import { TModes } from "@/interfaces";
import { extendTheme } from "@chakra-ui/react";

const baseTheme = extendTheme(
  // Esta es la base para despues usar este theme en Chakra
  // rgb(84, 87, 100) para el short break
  {
    colors: {
      counterBackground: "rgba(255, 255, 255, 0.1)",
      semiGray: "rgb(187, 187, 187)",
    },
    breakpoints: {
      usm: "22em",
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    },
  }
);

const pomodoroTheme = extendTheme(
  {
    colors: {
      primary: "#C53030",
    },
  },
  baseTheme
);

const shortBreakTheme = extendTheme(
  {
    colors: {
      primary: "rgb(84, 87, 100)",
    },
  },
  baseTheme
);

const longBreakTheme = extendTheme(
  {
    colors: {
      primary: "rgb(57, 112, 151);",
    },
  },
  baseTheme
);

export const themes: { [key in TModes]: any } = {
  Pomodoro: pomodoroTheme,
  "Short Break": shortBreakTheme,
  "Long Break": longBreakTheme,
  LongBreakInterval: undefined,
};
