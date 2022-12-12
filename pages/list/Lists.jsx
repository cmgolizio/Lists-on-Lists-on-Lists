/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Heading,
  Center,
  IconButton,
  useDisclosure,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { GrTrash, GrMoreVertical, GrEdit } from 'react-icons/gr';

import AddList from '../../src/components/list/AddList';
import EditListTitle from '../../src/components/list/EditListTitle';
import DeleteListConfirm from '../../src/components/list/DeleteListConfirm';
import { useAuth } from '../../src/hooks/useAuth';
import { db } from '../../src/firebase/firebase';

const Lists = () => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [targetedList, setTargetedList] = useState('');
  const { currentUser, lists, setLists, userColor, modeColor, notModeColor, deleteList } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  let type;

  const shadowColor = useColorModeValue(
    '35px 35px 70px #ceced4, -35px -35px 70px #ffffff',
    '35px 35px 70px #09090c, -35px -35px 70px #23232e'
    // '50px 50px 65px #09090c, -50px -50px 65px #23232e'
  );

  const bgGradient = useColorModeValue(
    'linear-gradient(to-br, #ffffff, #dfdfe6)',
    // !! 1 !! //
    // '#16161D'
    // !! 2 !! //
    'linear-gradient(to-br, #14141a, #18181f)'
  );

  useEffect(() => {
    setLists(null);
    const listsCollRef = collection(db, `users/${currentUser?.uid}/lists`);
    const q = query(listsCollRef, orderBy('created'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLists(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    });

    return unsubscribe;
  }, []);

  const handleMenuTarget = async (e, list, type) => {
    e.preventDefault();
    switch(type) {
      case 'delete': {
        await setTargetedList(list);
        return onOpen()
      }
      case 'edit': {
        await setTargetedList(list);
        return setShowEditTitle(true)
      }
    }
  };
  return (
    <VStack
      minH='100vh'
      minW='100vw'
      paddingTop={20}
    >
      <Center>
        <AddList />
      </Center>
      <Flex
        dir='row'
        wrap='wrap'
        h='100%'
        w='100%'
        align='center'
        justify='space-evenly'
      >
        {
          !lists ?
          null :
          (lists.map(list => (
                <Flex
                  key={list.id}
                  minH={300}
                  minW={300}
                  h='max-content'
                  w='max-content'
                  justify='center'
                  // bg={modeColor}
                  bg={bgGradient}
                  color={notModeColor}
                  boxShadow={shadowColor}
                  pos='relative'
                  borderRadius={19}
                  mx={5}
                  my={10}
                >
                  <Heading
                    size='xl'
                    p={5}
                    as='button'
                    onClick={() => router.push({
                    pathname: '/list/ActiveList',
                    query: {
                      title: list.title
                    },
                  }, `/${list.title}`)}
                  >
                    {list.title}
                  </Heading>
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
                        {/* <MenuItem icon={<GrTrash />} command='⌘D' onClick={() => deleteList(list)}> */}
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
              )))}
      </Flex>
    </VStack>
  );
};

export default Lists;

// export async function getServerSideProps(context) {

// };