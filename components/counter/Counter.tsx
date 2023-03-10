import { useCallback, useContext, useEffect } from "react";
import Swal from "sweetalert2";

import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

import { CounterContext } from "@/context/counter";

import { Modes } from "./Modes";

export const Counter = () => {
  const {
    addElapsedSecond,
    addPomodoroCount,
    changeMode,
    decreaseCounter,
    decreaseSeconds,
    elapsedSeconds,
    formattedTime,
    isRunning,
    minutes,
    mode,
    onFinish,
    pomodoroCount,
    seconds,
    setSeconds,
    toggleRun,
    timers,
  } = useContext(CounterContext);

  useEffect(() => {
    const onConfirmRefresh = function (event: any) {
      if (isRunning) {
        event.preventDefault();
        return (event.returnValue = "Are you sure you want to leave the page?");
      }
    };

    window.addEventListener("beforeunload", onConfirmRefresh);
    return () => window.removeEventListener("beforeunload", onConfirmRefresh);
  }, [isRunning]);

  const onToggleRun = () => {
    toggleRun();
  };

  const showAlert = useCallback(() => {
    let alertText;
    let alertTitle;

    if (mode === "Pomodoro") {
      alertTitle = "Hora de descansar";
      alertText =
        pomodoroCount % timers.LongBreakInterval === 0
          ? "¡Segui asi!<br>Es hora de tomar un gran descanso."
          : "¡Segui asi!<br>Es hora de tomar un breve descanso.";
    } else {
      alertTitle = "Hora de trabajar";
      alertText = "Buen descanso, ¡volvamos a trabajar!";
    }

    Swal.fire(alertTitle, alertText, "info").then(() => {
      onFinish();
    });
  }, [mode, onFinish, pomodoroCount, timers.LongBreakInterval]);

  useEffect(() => {
    if (isRunning) {
      if (minutes === 0 && seconds === 0) {
        toggleRun();
        showAlert();
      }

      const interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            decreaseCounter();
            setSeconds(59);
          }
        } else {
          decreaseSeconds();
        }
        addElapsedSecond();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    addElapsedSecond,
    addPomodoroCount,
    changeMode,
    decreaseCounter,
    decreaseSeconds,
    isRunning,
    minutes,
    mode,
    onFinish,
    seconds,
    setSeconds,
    showAlert,
    toggleRun,
  ]);
  const textToShow =
    mode === "Pomodoro" ? "Time to focus!" : "Time for a break!";

  const percentage = (elapsedSeconds * 100) / (timers[mode] * 60);

  return (
    <>
      <Flex
        mt={16}
        align="center"
        as="section"
        backgroundColor="counterBackground"
        borderRadius={12}
        className="fadeIn"
        direction="column"
        gap={2}
        justify="center"
        maxW={500}
        position="relative"
        px={{ base: 2, sm: 8 }}
        py={{ base: 6, sm: 8 }}
        w="100%"
      >
        <Box
          borderRadius="12px 12px 0px 0px"
          borderTop="6px solid rgba(0, 0, 0, 0.1)"
          position="absolute"
          top={0}
          w="99%"
        ></Box>
        <Box
          backgroundColor="white"
          borderRadius="12px 12px 0px 0px"
          h="6px"
          position="absolute"
          top={0}
          w={`${percentage}%`}
        ></Box>
        <Modes />
        <Text fontSize={{ base: 90, sm: 120 }} color="white" fontWeight="bold">
          {formattedTime}
        </Text>
        <Button
          backgroundColor="white"
          boxShadow={isRunning ? "none" : "rgb(235, 235, 235) 0px 6px 0px"}
          color="primary"
          h={"60px"}
          mb={1.5}
          onClick={() => onToggleRun()}
          transform={isRunning ? "translateY(6px)" : "none"}
          transition="color 0.6s ease"
          w="210px"
          _hover={{
            color: "primary",
          }}
        >
          <Text fontSize={22}>{isRunning ? "PAUSE" : "START"}</Text>
        </Button>
      </Flex>
      <Stack
        align="center"
        color="white"
        fontSize="lg"
        lineHeight="shorter"
        mt={6}
      >
        <Text opacity={0.7}>#{pomodoroCount}</Text>
        <Text mt="0.3rem !important">{textToShow}</Text>
      </Stack>
    </>
  );
};
