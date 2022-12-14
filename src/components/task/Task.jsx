import React, { useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  HStack,
  VStack,
  Heading,
  IconButton,
  Icon,
  Text,
  Alert,
  AlertIcon,
  Badge,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import {
  GrTrash,
  GrCheckbox,
  GrCheckboxSelected,
} from 'react-icons/gr';

import { useAuth } from '../../hooks/useAuth';
import AddSubTask from './sub-tasks/AddSubTask';
import SubTasks from './sub-tasks/SubTasks';
import PrioritySetter from './PrioritySetter';

const Task = ({ key, task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddSubTask, setShowSubTask] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [error, setError] = useState('');
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
    await setCompletedTasks(prev => [...prev, task]);
  };

  const handleExpandTask = (e) => {
    e.preventDefault();
    setShowSubTask(false);

    setIsExpanded(prev => !prev);
    expandTask(task.id, task.isExpanded);
  };

  const handleShowAddSubTask = (e) => {
    e.preventDefault();

    setShowSubTask(prev => !prev);
  };

  const handleShowPriority = async (e) => {
    e.preventDefault();

    setShowPriority(true);
  };

  // React.useEffect(() => {}, []);
  // React.useEffect(() => {
  //   console.log('COMPLETED TASKS (from Task.jsx): ', completedTasks);
  // }, [completedTasks]);

  return (
    <Box key={key} minW='100%' minH='100%' pos='relative' py={isExpanded && 5}>
      {error && <Alert variant='error'><AlertIcon/>{error}</Alert>}
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
        <HStack align='center' justify='center' bg={notModeColor} w='110%' h='130%' minW='max-content' borderRadius={5} pos='relative' border='1px' borderColor={modeColor}>

          <HStack
            w='100%'
            pos='absolute'
            bottom={1.5}
            align='center'
            justify='space-evenly'
            visibility={!isExpanded && 'hidden'}
          >
            {/* <SubTasks task={task} /> */}
            {
              showAddSubTask ?
                (<AddSubTask taskID={task.id} shouldShowInput={setShowSubTask} />) :
                (<IconButton
                  icon={<Icon as={AddIcon}/>}
                  color={modeColor}
                  variant='ghost'
                  size='sm'
                  _hover={{bg: 'transparent'}}
                  _active={{bg: 'transparent'}}
                  onClick={(e) => handleShowAddSubTask(e)}
                />)
            }
            {
              showPriority ?
                (<PrioritySetter taskID={task.id} setShowPriority={setShowPriority} setError={setError}/>) :
                (<IconButton
                  icon={<Icon as={WarningIcon}/>}
                  onClick={handleShowPriority}
                  color={modeColor}
                  variant='ghost'
                  size='sm'
                  _hover={{bg: 'transparent'}}
                  _active={{bg: 'transparent'}}
                />)
            }
          </HStack>

          <Stack
            pos={isExpanded ? 'absolute' : ''} top={1}
            align='center'
            justify='center'
            direction={isExpanded ? 'column' : 'row'}
          >
            <Text
              color={modeColor}
              fontSize='xl'
              decoration={task.isChecked ? 'line-through' : 'none'}
            >
              {task.description}
            </Text>

            {task.priority ?
              (<Badge
                bg={task.priority.bg}
                color={task.priority.color}
              >
                {task.priority.type}
              </Badge>) :
              null}
          </Stack>
          <IconButton
            color={modeColor}
            variant='ghost'
            pos='absolute'
            right={2}
            top={isExpanded && 0.25}
            size='sm'
            _hover={{bg: 'transparent'}}
            _active={{bg: 'transparent'}}
            icon={isExpanded ? <Icon as={TriangleUpIcon} /> : <Icon as={TriangleDownIcon} />}
            onClick={(e) => handleExpandTask(e)}
          />
        </HStack>
        <IconButton variant='ghost' bg='light' icon={<GrTrash />} onClick={(e) => handleDeleteTask(e)} _hover={{bg: '#ffaaa2'}} />
      </HStack>
    </Box>
  )
}

export default Task