import { useContext } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { TaskContext } from "@/context/tasks";
import { AddTask } from "./AddTask";
import { TaskItem } from "./TaskItem";

export const Tasks = () => {
  const { isCardOpen, toggleCard, tasks } = useContext(TaskContext);

  return (
    <>
      <Flex
        as="section"
        direction="column"
        maxW={500}
        px={{ base: 2, md: 0 }}
        py={{ base: 6, sm: 8 }}
        w="100%"
      >
        <Text color="white" fontWeight="bold" fontSize={18}>
          Tasks
        </Text>

        <Divider my={4} opacity={0.1} border="0.1px solid black" />
        <Flex direction="column" gap={2} mb={4}>
          {tasks.map((task) => {
            return <TaskItem task={task} key={task.id} />;
          })}
        </Flex>

        <Box
          onClick={() => toggleCard()}
          display={isCardOpen ? "none" : "flex"}
          alignItems="center"
          backgroundColor="rgba(0, 0, 0, 0.1)"
          border="2px dashed rgba(255, 255, 255, 0.4)"
          borderRadius={6}
          cursor="pointer"
          h="64px"
          justifyContent="center"
          opacity={0.8}
          w="100%"
          _hover={{
            opacity: 1,
          }}
        >
          <Flex gap={2} color="white">
            <AddCircleIcon />
            <Text as="button">Add Task</Text>
          </Flex>
        </Box>
        <AddTask />
      </Flex>
    </>
  );
};
