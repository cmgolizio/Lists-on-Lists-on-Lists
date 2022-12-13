import React from 'react';
import {
  HStack,
  Box,
  IconButton,
  Tag,
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const priorities = [
  {
    type: 'LOW',
    bg: 'green.200',
    color: 'green.700',
  },
  {
    type: 'MED',
    bg: 'orange.300',
    color: 'orange.800',
  },
  {
    type: 'HIGH',
    bg: 'red.300',
    color: 'red.800',
  },
];

const PrioritySetter = ({ taskID, setShowPriority, setError }) => {
  const { updatePriority } = useAuth();

  const handlePriorities = async (e) => {
    e.preventDefault();

    const priority = e.target.value;
    console.log(e);

    try {
      await updatePriority(taskID, priority);

      setShowPriority(false);
    } catch (error) {
      setError('Could not set priority')
    }
  }

  return (
    <HStack>
      {
        priorities.map(p => {
          const { type, bg, color } = p;
          return (
            <Tag
              key={type}
              as='button'
              bg={bg}
              color={color}
              value={type}
              onClick={(e) => handlePriorities(e)}
            >
              {type}
            </Tag>
          );
        })
      }
    </HStack>
  );
};

export default PrioritySetter;