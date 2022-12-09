/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  VStack,
  Heading,
  Box
} from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { db } from '../../src/firebase/firebase';
import { useAuth } from '../../src/hooks/useAuth';
import AddTask from '../../src/components/task/AddTask';
import Tasks from '../../src/components/task/Tasks';

const ActiveList = () => {
  const { currentUser, activeList, setActiveList, tasks } = useAuth();
  const router = useRouter();

  const getActiveList = async () => {
    const docRef = doc(db, `users/${currentUser.uid}/lists/${router.query.title}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setActiveList(docSnap.data());
    } else {
      router.push('/list/Lists');
    }
  };

  useEffect(() => {
    router.prefetch('/list/Lists');
  }, []);

  useEffect(() => {
    getActiveList();
  }, []);

  return (
    <VStack
      w='100%'
      minH='100vh'
      paddingTop={20}
    >
      <Box mb={20}>
        <Heading  size='3xl'>
          {!activeList ? null : activeList.title}
        </Heading>
      </Box>
      <AddTask />
      <Box paddingTop='5rem' visibility={!tasks ? 'hidden' : 'visible'}>
        {!activeList ? null : <Tasks />}
      </Box>
    </VStack>
  );
};

export default ActiveList;