/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Flex,
  Container,
  Grid,
  GridItem,
  Center,
  Box,
} from '@chakra-ui/react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

import CustomPopover from '../../src/components/ui/CustomPopover';
import AddListButton from '../../src/components/list/AddListButton';
import AddList from '../../src/components/list/AddList';
import List from '../../src/components/list/List';
import { useAuth } from '../../src/hooks/useAuth';
import { db } from '../../src/firebase/firebase';
import PageTransition from '../../styles/framer-motion/PageTransition';

const Lists = () => {
  const [targetedList, setTargetedList] = useState('');
  const { currentUser, lists, setLists } = useAuth();

  useEffect(() => {
    setLists(null);
    const listsCollRef = collection(db, `users/${currentUser?.uid}/lists`);
    const q = query(listsCollRef, orderBy('created'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLists(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    });

    return unsubscribe;
  }, []);

  return (
    <Box h='100vh' pt={10}>
      <Center pos='absolute' top={2} left='50%'>
        <CustomPopover />
      </Center>
      <Flex
        dir={['column', null, null, 'row']}
        wrap={['wrap', null, null, 'nowrap']}
        overflowX={['hidden', 'auto', 'auto', 'auto']}
        overflowY={['auto', 'auto', 'auto', 'hidden']}
        h={['80%', null, null, 'calc(100vh - 15rem)']}
        m='4px 4px'
        p='4px'
        whiteSpace='nowrap'
      >
        {
          !lists ?
          null :
          (lists.map(list => {
            return (
              <Container
                key={list.id}
                centerContent
                flex='0 0 auto'
                w={['80%', null, null, 'calc(33% - 20px)']}
                h={['100%', null, null, null]}
              >
                <List
                  list={list}
                  targetedList={targetedList}
                  setTargetedList={setTargetedList}
                />
              </Container>
            );
          }))}
      </Flex>
    </Box>
  );
};

export default Lists;