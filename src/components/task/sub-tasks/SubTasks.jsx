
import React, { useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { VStack } from '@chakra-ui/react';

import { db } from '../../../firebase/firebase';
import { useAuth } from '../../../hooks/useAuth';
import SubTask from './SubTask';

const SubTasks = ({ task }) => {
  const {
    currentUser,
    activeList,
    subTasks,
    setSubTasks
  } = useAuth();

  useEffect(() => {
    const subTasksCollRef = collection(db, `users/${currentUser.uid}/lists/${activeList?.title}/tasks/${task.id}/subTasks`);
    const q = query(subTasksCollRef, orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setSubTasks(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeList]);

  return (
    <VStack maxH='9rem' h='100%' spacing={5}>
      {
        subTasks.map(s => {
          return (
            <SubTask key={s.id} subTask={s} />
          );
        })
      }
    </VStack>
  );
};

export default SubTasks;