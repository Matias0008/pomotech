import { ChangeEvent, useContext, useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Input,
  Text,
  Textarea,
  useOutsideClick,
} from "@chakra-ui/react";

import { TaskContext } from "@/context/tasks";
import { Task } from "@/interfaces";

export const AddTask = () => {
  const { toggleCard, isCardOpen, closeCard, addTask } =
    useContext(TaskContext);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef(null);

  useOutsideClick({
    ref: cardRef,
    handler: () => closeCard(),
  });

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView();
  }, [isCardOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onCancelTask = () => {
    toggleCard();
    setInputValue("");
  };

  const onSaveTask = () => {
    setInputValue("");
    inputRef.current?.focus();

    const newTask: Task = {
      id: uuidv4(),
      name: inputValue,
      estimatedPomodoros: 2,
      isCompleted: false,
    };
    addTask(newTask);
  };

  return (
    <Card
      variant="elevated"
      className="fadeInFast"
      borderRadius={6}
      display={isCardOpen ? "initial" : "none"}
      ref={cardRef}
    >
      <CardBody>
        <Text
          color="black"
          display={inputValue.length > 0 ? "none" : "initial"}
          fontSize={20}
          fontWeight="bold"
          opacity={0.2}
          pl={0.2}
          position="absolute"
          top="25px"
        >
          What are you working on
        </Text>
        <Input
          ref={inputRef}
          border="none"
          boxShadow="none"
          fontSize={20}
          fontWeight="bold"
          onChange={handleChange}
          outline="none"
          p={0}
          value={inputValue}
          _focusVisible={{
            boxShadow: "none",
          }}
          onKeyDown={(event) => (event.key === "Enter" ? onSaveTask() : null)}
        />
      </CardBody>
      <Flex
        w="100%"
        background="rgb(239, 239, 239)"
        justify="flex-end"
        p={4}
        borderRadius={6}
      >
        <Button onClick={() => onCancelTask()}>Cancel</Button>
        <Button onClick={() => onSaveTask()} color="cyan.600">
          Save
        </Button>
      </Flex>
    </Card>
  );
};
