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
  VStack,
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
  let type;
  useEffect(() => {
    setLists(null);
    const listsCollRef = collection(db, `users/${currentUser?.uid}/lists`);
    const q = query(listsCollRef, orderBy('created'));
    // const q = query(listsCollRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLists(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id, created: doc.data().created?.toDate().getTime()})))
      // setLists(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(targetedList.title);
  }, [targetedList])

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
      bg={userColor}
    >
      {/* <Center> */}
        <AddList />
      {/* </Center> */}
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
                  h='15rem'
                  w='20rem'
                  justify='center'
                  bg='cornflowerblue'
                  pos='relative'
                  borderRadius={5}
                >
                  <Heading
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
                        <MenuItem icon={<GrTrash />} command='⌘D' onClick={(e) => handleMenuTarget(e, list, type='delete')}>
                          Delete
                        </MenuItem>
                        <DeleteListConfirm
                          onClose={onClose}
                          isOpen={isOpen}
                          targetedList={targetedList}
                        />
                        <MenuItem icon={<GrEdit />} command='⌘E' onClick={(e) => handleMenuTarget(e, list, type='edit')}>
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