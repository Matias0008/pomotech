import { ChangeEvent, useContext } from "react";
import { Card, CardBody, Checkbox, Flex, Text, Stack } from "@chakra-ui/react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { TaskContext } from "@/context/tasks";
import { Task } from "@/interfaces";

export const TaskItem = ({ task }: { task: Task }) => {
  const { updateTask } = useContext(TaskContext);
  const onChangeCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    updateTask({
      ...task,
      isCompleted: isChecked,
    });
  };

  return (
    <Card borderLeft={"8px solid black"} cursor="pointer">
      <CardBody>
        <Stack isInline justifyContent="space-between">
          <Flex gap={4} align="center">
            <Checkbox
              checked={task.isCompleted}
              size="lg"
              onChange={onChangeCompleted}
            />
            <Text
              fontWeight="bold"
              fontSize={15}
              color="rgb(85, 85, 85)"
              textDecoration={task.isCompleted ? "line-through" : "none"}
            >
              {task.name}
            </Text>
          </Flex>
          <Flex>
            <MoreVertIcon sx={{ flex: 1, alignSelf: "end" }} />
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
