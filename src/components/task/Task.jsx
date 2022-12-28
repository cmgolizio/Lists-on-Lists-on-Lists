import React, { useState } from "react";
import {
  Box,
  Stack,
  HStack,
  IconButton,
  Icon,
  Text,
  Alert,
  AlertIcon,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  AddIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { GrTrash, GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

import { useAuth } from "../../hooks/useAuth";
import AddSubTask from "./sub-tasks/AddSubTask";
import SubTasks from "./sub-tasks/SubTasks";
import PrioritySetter from "./PrioritySetter";

const Task = ({ key, task }) => {
  // const [isExpanded, setIsExpanded] = useState(false);
  const [showAddSubTask, setShowSubTask] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [error, setError] = useState("");
  const {
    deleteTask,
    checkTask,
    expandTask,
    userColor,
    modeColor,
    notModeColor,
    completedTasks,
    setCompletedTasks,
    subTasks,
  } = useAuth();

  const handleDeleteTask = (e) => {
    e.preventDefault();

    deleteTask(task);
  };

  const handleCheckTask = async (e) => {
    e.preventDefault();

    checkTask(task, task.isChecked);
    await setCompletedTasks((prev) => [...prev, task]);
  };

  const handleExpandTask = (e) => {
    e.preventDefault();
    setShowSubTask(false);

    setIsExpanded((prev) => !prev);
    expandTask(task.id, task.isExpanded);
  };

  const handleShowAddSubTask = (e) => {
    e.preventDefault();

    setShowSubTask((prev) => !prev);
  };

  const handleShowPriority = async (e) => {
    e.preventDefault();

    setShowPriority(true);
  };

  const priorityBg = (isExpanded) => {
    if (task.priority) {
      if (!isExpanded) {
        return task.priority.bg;
      } else {
        return notModeColor;
      }
    } else {
      return notModeColor;
    }
  };

  return (
    <Accordion allowToggle h='max-content' w='100%'>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <IconButton
                  variant='ghost'
                  bg={task.isChecked ? "#97ff8e" : "light"}
                  _hover={{ bg: "#97ff8e" }}
                  icon={
                    task.isChecked ? <GrCheckboxSelected /> : <GrCheckbox />
                  }
                  onClick={(e) => handleCheckTask(e)}
                />
                <Box
                  as='span'
                  flex='1'
                  textAlign='left'
                  ml={4}
                  bg={() => priorityBg(isExpanded)}
                  color={modeColor}
                >
                  {task.description}
                </Box>
                {!isExpanded ? null : task.priority ? (
                  <Badge bg={task.priority.bg} color={task.priority.color}>
                    {task.priority.type}
                  </Badge>
                ) : null}
                <AccordionIcon color={modeColor} />
                <IconButton
                  variant='ghost'
                  bg='light'
                  icon={<GrTrash />}
                  ml={5}
                  onClick={(e) => handleDeleteTask(e)}
                  _hover={{ bg: "#ffaaa2" }}
                />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SubTasks task={task} />
              {showAddSubTask ? (
                <AddSubTask taskID={task.id} shouldShowInput={setShowSubTask} />
              ) : (
                <IconButton
                  icon={<Icon as={AddIcon} />}
                  color={modeColor}
                  variant='ghost'
                  size='sm'
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  onClick={(e) => handleShowAddSubTask(e)}
                />
              )}
              {showPriority ? (
                <PrioritySetter
                  taskID={task.id}
                  setShowPriority={setShowPriority}
                  setError={setError}
                />
              ) : (
                <IconButton
                  icon={<Icon as={WarningIcon} />}
                  onClick={handleShowPriority}
                  color={modeColor}
                  variant='ghost'
                  size='sm'
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                />
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default Task;
