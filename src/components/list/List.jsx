/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  IconButton,
  useDisclosure,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { GrTrash, GrMoreVertical, GrEdit } from 'react-icons/gr';

import EditListTitle from './EditListTitle';
import DeleteListConfirm from './DeleteListConfirm';
import { useAuth } from '../../hooks/useAuth';
import ListTasks from '../task/ListTasks';

const List = ({ list, targetedList, setTargetedList }) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const { notModeColor, activateNewList, tasks } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  let type;

  const shadowColor = useColorModeValue(
    '35px 35px 80px #ceced4, 10px -1px 75px #f0f0f0',
    '35px 35px 70px #09090c, -20px -20px 80px #23232e',
  );

  const bgGradient = useColorModeValue(
    'linear-gradient(to-br, #ffffff, #dfdfe6)',
    'linear-gradient(to-br, #14141a, #18181f)'
  );

  const handleMenuTarget = async (e, list, type) => {
    e.preventDefault();
    switch(type) {
      case 'delete': {
        await setTargetedList(list);
        return onOpen();
      }
      case 'edit': {
        await setTargetedList(list);
        return setShowEditTitle(true);
      }
    }
  };

  const handleActivateList = async () => {
    router.push({
        pathname: '/list/ActiveList',
        query: {
          title: list.title
        },
      }, `/${list.title}`);

      await activateNewList(list);
  };

  React.useEffect(() => {
    console.log('From List.jsx - List => ', list);
  }, []);

  return (
    <Flex
      minH='calc(100% - 10rem)'
      h='max-content'
      w='100%'
      // w='max-content'
      justify='center'
      bg={bgGradient}
      color={notModeColor}
      boxShadow={shadowColor}
      pos='relative'
      borderRadius={19}
      // mx={5}
      my='5rem'
      px={10}
    >
      <Heading
        size='xl'
        pos='absolute'
        top={3}
        left='50%'
        transform='translate(-50%, 0)'
        p={5}
        as='button'
        onClick={handleActivateList}
      >
        {list.title}
      </Heading>
      <ListTasks />
      <Box
        h='100%'
        pos='absolute'
        top={3}
        right={3}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<GrMoreVertical />}
            variant='ghost'
            isRound
          />
          <MenuList>
            <MenuItem icon={<GrTrash />} command='⌘D' onClick={(e) => handleMenuTarget(e, list, 'delete')}>
              Delete
            </MenuItem>
            <DeleteListConfirm
              onClose={onClose}
              isOpen={isOpen}
              targetedList={targetedList}
            />
            <MenuItem icon={<GrEdit />} command='⌘E' onClick={(e) => handleMenuTarget(e, list, 'edit')}>
              Edit Title
            </MenuItem>
            <Box
              w='85%'
              pos='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
            >
              <EditListTitle
                target={targetedList}
                showEditTitle={showEditTitle}
                setShowEditTitle={setShowEditTitle}
              />
            </Box>
          </MenuList>
        </Menu>
      </Box>
  </Flex>
  );
};

export default List;