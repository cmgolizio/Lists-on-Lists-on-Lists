import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Button,
} from '@chakra-ui/react';
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { db } from '../../src/firebase/firebase';
import { useAuth } from '../../src/hooks/useAuth';
import AddTask from '../../src/components/task/AddTask';
import Tasks from '../../src/components/task/Tasks';

const ActiveList = () => {
  const [activeList, setActiveList] = useState();
  const { currentUser } = useAuth();
  const router = useRouter();

  const getOneList = async () => {
    const docRef = await doc(db, `users/${currentUser.uid}/lists/${router.query.title}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setActiveList(docSnap.data());
    } else {
      console.log("THAT SHIT DON'T EXIST")
    }
  };

  useEffect(() => {
    getOneList();
  }, [])

  useEffect(() => {
    console.log('ACTIVE LIST FROM ActiveList.jsx: ', activeList);
  }, [activeList])

  const handleCloseList = async () => {
    setActiveList();

    await router.push('/list/Lists');
  }

  return (
    <VStack
      w='100%'
      minH='max-content'
    >
      <Button
        top={20}
        my={10}
        onClick={handleCloseList}
      >
        Close
      </Button>
      <Heading py='3rem' size='lg'>
        {activeList && activeList.title}
      </Heading>
      <AddTask />
      <Tasks />
    </VStack>
  );
};

export default ActiveList;