import React, { useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  HStack,
  Heading,
  IconButton,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import {
  GrTrash,
  GrCheckbox,
  GrCheckboxSelected,
} from 'react-icons/gr';

import { useAuth } from '../../hooks/useAuth';
import AddSubTask from './sub-tasks/AddSubTask';
import SubTasks from './sub-tasks/SubTasks';

const Task = ({ key, task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddSubTask, setShowSubTask] = useState(false);
  const {
    deleteTask,
    checkTask,
    expandTask,
    userColor,
    modeColor,
    notModeColor,
  } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteTask = (e) => {
    e.preventDefault();

    deleteTask(task.id);
  };

  const handleCheckTask = (e) => {
    e.preventDefault();

    checkTask(task.id, task.isChecked);
  };

  const handleExpandTask = (e) => {
    e.preventDefault();

    setIsExpanded(prev => !prev);
    expandTask(task.id, task.isExpanded);
  };

  const handleShowAddSubTask = (e) => {
    e.preventDefault();

    setShowSubTask(prev => !prev);
  };

  return (
    <Box key={key} minW='100%' minH='100%' pos='relative' py={isExpanded && 5}>
      <HStack w='35rem' h={isExpanded ? '10rem' : '2rem'} justify='space-between'>
        <IconButton
          variant='ghost'
          bg={task.isChecked ? '#97ff8e' : 'light'}
          _hover={{bg: '#97ff8e'}}
          icon={
            task.isChecked ?
              <GrCheckboxSelected /> :
              <GrCheckbox />
          }
          onClick={(e) => handleCheckTask(e)}
        />
        <HStack align='center' justify='center' bg={notModeColor} w='110%' h='130%' minW='max-content' borderRadius={5} pos='relative'>
          <IconButton
            icon={<Icon as={AddIcon}/>}
            color={modeColor}
            variant='ghost'
            pos='absolute'
            left={2}
            bottom={isExpanded && 1.5}
            size='sm'
            _hover={{bg: 'transparent'}}
            _active={{bg: 'transparent'}}
            onClick={(e) => handleShowAddSubTask(e)}
          />
          <Text color={modeColor} paddingTop={1} fontSize='xl' paddingLeft={1.5} decoration={task.isChecked ? 'line-through' : 'none'} pos={isExpanded ? 'absolute' : ''} top={1}>{task.description}</Text>
          {showAddSubTask && <AddSubTask taskID={task.id} shouldShowInput={setShowSubTask} />}
          <IconButton
            color={modeColor}
            variant='ghost'
            pos='absolute'
            right={2}
            top={isExpanded && 0.25}
            size='lg'
            _hover={{bg: 'transparent'}}
            _active={{bg: 'transparent'}}
            icon={isExpanded ? <Icon as={ChevronUpIcon} /> : <Icon as={ChevronDownIcon} />}
            onClick={(e) => handleExpandTask(e)}
          />
        </HStack>
        <IconButton variant='ghost' bg='light' icon={<GrTrash />} onClick={(e) => handleDeleteTask(e)} _hover={{bg: '#ffaaa2'}} />
      </HStack>
    </Box>
  )
}

export default Task