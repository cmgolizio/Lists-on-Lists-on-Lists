/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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
  const [isExample, setIsExample] = useState(false);
  const {
    currentUser,
    activeList,
    setActiveList,
    tasks,
  } = useAuth();
  const router = useRouter();

  const getActiveList = async () => {
    const activeListRef = doc(db, `users/${currentUser.uid}/lists/${router.query.title}`);
    const activeListSnap = await getDoc(activeListRef);

    if (activeListSnap.exists()) {
      await setActiveList(activeListSnap.data());
    } else {
      await router.push('/list/Lists', '/mylists');
    }
  };

  useEffect(() => {
    router.prefetch('/list/Lists', '/mylists');
  }, []);

  useEffect(() => {
    getActiveList();
  }, []);

  // useEffect(() => {
  //   console.log('IS EXAMPLE LIST: ', isExample);
  // }, []);

  return (
    <VStack
      w='100vw'
      minH='100vh'
      paddingTop={[5, null, null, 20]}
    >
      <Box mb={15}>
        <Heading  size='3xl'>
          {!activeList ? null : activeList.title}
        </Heading>
      </Box>
      {/* <AddTask /> */}
      <Box paddingTop='5rem' visibility={!tasks ? 'hidden' : 'visible'}>
        {!activeList ? null : <Tasks />}
      </Box>
    </VStack>
  );
};

export default ActiveList;