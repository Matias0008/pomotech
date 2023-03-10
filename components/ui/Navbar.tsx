import { useContext, useRef } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TaskIcon from "@mui/icons-material/Task";

import { CounterContext } from "@/context/counter";

import {
  POMODORO_TIMER,
  SHORT_BREAK_TIMER,
  LONG_BREAK_TIMER,
  LONG_BREAK_INTERVAL,
} from "@/constants";

interface FormData {
  autoStartBreaks?: boolean;
  autoStartPomodoros?: boolean;
  LongBreakInterval?: number;
  Pomodoro?: number;
  "Short Break"?: number;
  "Long Break"?: number;
}

export const Navbar = () => {
  const inputSubmitRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isRunning,
    setAutoStartBreaks,
    setAutoStartPomodoros,
    setLongBreakInterval,
    setLongBreakTimer,
    setPomodoroTimer,
    setShortBreakTimer,
    timers,
    updateMinutes,
  } = useContext(CounterContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm();

  const onCloseModal = () => {
    inputSubmitRef.current?.click();
  };

  const onSubmit = (data: FormData) => {
    onClose();
    console.log(data);

    setPomodoroTimer(Number(data.Pomodoro));
    setShortBreakTimer(data["Short Break"]!);
    setLongBreakTimer(data["Long Break"]!);
    setLongBreakInterval(data.LongBreakInterval!);
    setAutoStartPomodoros(data.autoStartPomodoros!);
    setAutoStartBreaks(data.autoStartBreaks!);

    if (!isRunning) {
      updateMinutes();
    }
  };

  return (
    <header>
      <Flex
        as="nav"
        className="fadeIn"
        maxW={800}
        m="0 auto"
        p={2}
        align="center"
        justify="space-between"
        h="60px"
        boxShadow="0 2px 2px -2px rgba(0,0,0,.2)"
      >
        <Text
          as="h2"
          fontSize={20}
          color="white"
          fontWeight="600"
          display={{ base: "none", sm: "block" }}
        >
          Pomotech
        </Text>
        <Box display={{ base: "block", sm: "none" }}>
          <Image
            src={"https://pomofocus.io/images/icon-white2.png"}
            width={20}
            height={20}
            alt="Logo de pomotech"
          />
        </Box>
        <Stack isInline gap={1} color="white">
          <Flex
            gap={1}
            fontSize={13}
            background="counterBackground"
            py={1.5}
            px={3}
            align="center"
            justify="center"
            borderRadius={4}
            cursor="pointer"
            as="button"
            onClick={() => onOpen()}
            opacity={0.9}
            _hover={{ opacity: 1 }}
            _active={{
              transform: "translateY(2px)",
            }}
          >
            <SettingsIcon
              sx={{
                fontSize: "16px",
              }}
            />
            <Text>Settings</Text>
            <Modal
              isOpen={isOpen}
              onClose={() => onCloseModal()}
              size="sm"
              motionPreset="none"
              blockScrollOnMount={true}
            >
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap={2} mb={4} color="semiGray">
                      <AccessTimeFilledIcon />
                      <Text fontWeight="bold">Timer</Text>
                    </Flex>
                    <Text
                      mb={1.5}
                      fontWeight="600"
                      fontSize={15}
                      color="rgb(85, 85, 85)"
                    >
                      Time (minutes)
                    </Text>
                    <Stack isInline justify="space-between">
                      <Flex direction="column" gap={1}>
                        <Text
                          fontSize={13}
                          fontWeight="bold"
                          color="rgb(187, 187, 187)"
                        >
                          Pomodoro
                        </Text>
                        <NumberInput
                          defaultValue={timers.Pomodoro}
                          maxW="100px"
                          size="md"
                          variant="filled"
                          isInvalid={!!formErrors.Pomodoro}
                        >
                          <NumberInputField
                            {...register("Pomodoro", {
                              required: true,
                              min: 1,
                              max: 90,
                            })}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                      <Flex direction="column" gap={1}>
                        <Text
                          fontSize={13}
                          fontWeight="bold"
                          color="rgb(187, 187, 187)"
                        >
                          Short Break
                        </Text>
                        <NumberInput
                          defaultValue={timers["Short Break"]}
                          maxW="100px"
                          size="md"
                          variant="filled"
                          isInvalid={!!formErrors["Short Break"]}
                        >
                          <NumberInputField
                            {...register("Short Break", {
                              required: true,
                              min: 1,
                              max: 90,
                            })}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                      <Flex direction="column" gap={1}>
                        <Text
                          fontSize={13}
                          fontWeight="bold"
                          color="rgb(187, 187, 187)"
                        >
                          Long Break
                        </Text>
                        <NumberInput
                          defaultValue={timers["Long Break"]}
                          maxW="100px"
                          size="md"
                          variant="filled"
                          isInvalid={!!formErrors["Long Break"]}
                        >
                          <NumberInputField
                            {...register("Long Break", {
                              required: true,
                              min: 1,
                              max: 90,
                            })}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </Stack>
                    <Flex mt={6} justifyContent="space-between" align="center">
                      <Text
                        fontSize={15}
                        fontWeight="bold"
                        color="rgb(85, 85, 85)"
                      >
                        Auto Start Pomodoros
                      </Text>
                      <Switch
                        size="lg"
                        {...register("autoStartPomodoros")}
                        defaultChecked={
                          localStorage.getItem("autoStartPomodoros") === "true"
                            ? true
                            : false
                        }
                      />
                    </Flex>
                    <Flex mt={6} justifyContent="space-between" align="center">
                      <Text
                        fontSize={15}
                        fontWeight="bold"
                        color="rgb(85, 85, 85)"
                      >
                        Auto Start Breaks
                      </Text>
                      <Switch
                        size="lg"
                        {...register("autoStartBreaks")}
                        defaultChecked={
                          localStorage.getItem("autoStartBreaks") === "true"
                            ? true
                            : false
                        }
                      />
                    </Flex>
                    <Flex mt={6} justifyContent="space-between" align="center">
                      <Text
                        fontSize={15}
                        fontWeight="bold"
                        color="rgb(85, 85, 85)"
                      >
                        Long Break interval
                      </Text>
                      <NumberInput
                        defaultValue={timers.LongBreakInterval}
                        maxW="80px"
                        size="md"
                        variant="filled"
                        isInvalid={!!formErrors.LongBreakInterval}
                      >
                        <NumberInputField
                          {...register("LongBreakInterval", {
                            required: true,
                            min: 1,
                            max: 90,
                            validate: (n) =>
                              !Number.isInteger(Number(n))
                                ? "Numero no entero"
                                : undefined,
                          })}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                    <Divider my={8} />
                    <Flex color="semiGray" gap={2} mb={4}>
                      <TaskIcon />
                      <Text fontWeight="bold">Tasks</Text>
                    </Flex>

                    <input
                      type="submit"
                      style={{ display: "none" }}
                      ref={inputSubmitRef}
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => onCloseModal()}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>

          <Flex
            gap={1.5}
            fontSize={13}
            background="counterBackground"
            py={1.5}
            px={3}
            align="center"
            justify="center"
            borderRadius={4}
            cursor="pointer"
            as="button"
            opacity={0.9}
            _hover={{ opacity: 1 }}
            _active={{
              transform: "translateY(2px)",
            }}
          >
            <LoginIcon sx={{ fontSize: "16px" }} />
            <Text>Login</Text>
          </Flex>
        </Stack>
      </Flex>
    </header>
  );
};
