/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Center } from '@chakra-ui/react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import AddList from '../../src/components/list/AddList';
import { useAuth } from '../../src/hooks/useAuth';
import { db } from '../../src/firebase/firebase';

const Lists = () => {
  const { currentUser, lists, setLists, activeList } = useAuth();
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

  return (
    <Box
      h='max-content'
      w='100%'
      pos='absolute'
      top={10}
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
                <Box
                  as='button'
                  m='2rem'
                  h='15rem'
                  w='20rem'
                  bg='cornflowerblue'
                  borderRadius='3rem'
                  key={list.listID}
                  onClick={() => router.push({
                    pathname: '/list/ActiveList',
                    query: {
                      title: list.title
                    },
                  }, '/list/ActiveList')}
                >
                  <Heading size='xl'>
                    {list.title}
                  </Heading>
                </Box>
              )))
        }
      </Flex>
    </Box>
  );
};

export default Lists;

// export async function getServerSideProps(context) {

// };