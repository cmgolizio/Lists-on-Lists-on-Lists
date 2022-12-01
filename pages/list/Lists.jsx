/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
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
  const { currentUser, lists, setLists, userColor } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    setLists(null);
    const listsCollRef = collection(db, `users/${currentUser?.uid}/lists`);
    const q = query(listsCollRef, orderBy('created'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLists(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id, created: doc.data().created?.toDate().getTime()})))
    });

    return unsubscribe;
  }, []);

  const handleMenuTarget = async (e, list) => {
    e.preventDefault();

    await setTargetedList(list);
    return onOpen();
  };

  return (
    <Box
      h='max-content'
      w='100%'
      pos='absolute'
      top={10}
      bg={userColor}
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
                  m='2rem'
                  h='15rem'
                  w='20rem'
                  justify='center'
                  bg='cornflowerblue'
                  pos='relative'
                  borderRadius='3rem'
                >
                  {showEditTitle ?
                  (
                    <Box
                      w='85%'
                      pos='absolute'
                      top='50%'
                      left='50%'
                      transform='translate(-50%, -50%)'
                    >
                      <EditListTitle target={list} />
                    </Box>
                  ) :
                  (<Heading
                    size='xl'
                    as='button'
                    onClick={() => router.push({
                    pathname: '/list/ActiveList',
                    query: {
                      title: list.title
                    },
                  }, '/list/ActiveList')}
                  >
                    {list.title}
                  </Heading>)}
                  <Box
                    h='100%'
                    pos='absolute'
                    top={3}
                    right={3}
                    // isOpen={isOpen}
                  >
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        // isActive={tisOpen}
                        onClick={(e) => handleMenuTarget(e, list)}
                        icon={<GrMoreVertical />}
                        variant='ghost'
                        isRound
                      />
                      <MenuList>
                        <MenuItem icon={<GrTrash />} command='⌘D' onClick={onOpen}>
                          Delete
                        </MenuItem>
                        <DeleteListConfirm
                          onClose={onClose}
                          isOpen={isOpen}
                          targetedList={targetedList}
                        />
                        <MenuItem icon={<GrEdit />} command='⌘E' onClick={() => isOpen && setShowEditTitle(true)}>
                          Edit Title
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
              </Flex>
              )))}
      </Flex>
    </Box>
  );
};

export default Lists;

// export async function getServerSideProps(context) {

// };