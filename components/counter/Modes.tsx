import { useState, useContext } from "react";

import { Stack } from "@chakra-ui/react";

import { TModes } from "@/interfaces";
import { CounterContext } from "@/context/counter";
import { OptionMode } from "./OptionMode";

import { VALID_MODES, USM_VALID_MODES } from "../../constants";

export const Modes = () => {
  const [active, setActive] = useState<TModes>("Pomodoro");
  const { mode, isRunning, changeMode } = useContext(CounterContext);

  const onActiveChange = (name: TModes) => {
    if (isRunning)
      return alert("El contador esta corriendo. Detenlo para cambiar de modo.");
    setActive(name);
    changeMode(name);
  };

  return (
    <>
      <Stack isInline display={{ base: "none", usm: "flex" }} gap={0}>
        {VALID_MODES.map((item) => {
          return (
            <OptionMode
              onActiveChange={(name) => onActiveChange(name)}
              isActive={mode === item}
              key={item}
            >
              {item}
            </OptionMode>
          );
        })}
      </Stack>
      <Stack isInline display={{ base: "flex", usm: "none" }}>
        {USM_VALID_MODES.map((item) => {
          return (
            <OptionMode
              onActiveChange={(name) => onActiveChange(name)}
              isActive={item === active}
              key={item}
            >
              {item}
            </OptionMode>
          );
        })}
      </Stack>
    </>
  );
};
