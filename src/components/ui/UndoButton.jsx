import React from 'react';
import { IconButton, Icon } from '@chakra-ui/react';
import { RepeatClockIcon } from '@chakra-ui/icons';

import { useAuth } from '../../hooks/useAuth';

const UndoButton = () => {
  const { undoDeleteTask, modeColor, notModeColor, deletedTasks } = useAuth();
  return (
    <IconButton
      bg={modeColor}
      color={notModeColor}
      _hover={{ bg: notModeColor, color: modeColor }}
      disabled={deletedTasks === null}
      onClick={undoDeleteTask}
      icon={<Icon as={RepeatClockIcon} />}
    />
  );
};

export default UndoButton;