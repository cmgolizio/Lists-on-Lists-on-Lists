import React from 'react';
import { IconButton, Icon } from '@chakra-ui/react';
import { RepeatClockIcon } from '@chakra-ui/icons';

import { useAuth } from '../../hooks/useAuth';

const UndoButton = () => {
  const {
    activeList,
    undoDeleteList,
    undoDeleteTask,
    modeColor,
    notModeColor,
    deletedLists,
    deletedTasks,
  } = useAuth();
  return (
    <IconButton
      bg={modeColor}
      color={notModeColor}
      _hover={{ bg: notModeColor, color: modeColor, border: '1px', borderColor: modeColor }}
      disabled={activeList ? deletedTasks === null : deletedLists === null}
      onClick={activeList ? undoDeleteTask : undoDeleteList}
      borderRadius='full'
      icon={<Icon as={RepeatClockIcon} />}
    />
  );
};

export default UndoButton;