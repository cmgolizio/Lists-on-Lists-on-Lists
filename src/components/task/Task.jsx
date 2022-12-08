import React from 'react';
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { GrTrash, GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

import { useAuth } from '../../hooks/useAuth';

const Task = ({ key, task }) => {
  const { deleteTask, checkTask, userColor, modeColor, notModeColor } = useAuth();

  const handleDeleteTask = (e) => {
    e.preventDefault();

    deleteTask(task.id);
  };

  const handleCheckTask = (e) => {
    e.preventDefault();

    checkTask(task.id, task.isChecked);
  };

  return (
    <Box key={key} minW='100%' minH='100%'>
      <HStack w='20rem' h='2rem' justify='space-between'>
        <IconButton
          variant='outline'
          bg={task.isChecked ? '#97ff8e' : 'light'}
          _hover={{bg: '#97ff8e'}}
          icon={
            task.isChecked ?
              <GrCheckboxSelected /> :
              <GrCheckbox />
          }
          onClick={(e) => handleCheckTask(e)}
        />
        <Box textAlign='center' bg={notModeColor} w='110%' h='130%' minW='max-content' borderRadius={5}>
          <Text color={modeColor} paddingTop={1} fontSize='xl' paddingLeft={1.5} decoration={task.isChecked ? 'line-through' : 'none'}>{task.description}</Text>
        </Box>
        <IconButton variant='outline' bg='light' icon={<GrTrash />} onClick={(e) => handleDeleteTask(e)} _hover={{bg: '#ffaaa2'}} />
      </HStack>
    </Box>
  )
}

export default Task