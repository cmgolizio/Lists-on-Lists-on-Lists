
import React, { useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import {
  VStack,
  Heading,
} from '@chakra-ui/react';

import { db } from '../../firebase/firebase';
import { useAuth } from '../../hooks/useAuth';
import AddTask from './AddTask';
import Task from './Task';

const Tasks = () => {
  const {
    currentUser,
    activeList,
    tasks,
    setTasks,
  } = useAuth();

  useEffect(() => {
    const tasksCollRef = collection(db, `users/${currentUser.uid}/lists/${activeList?.title}/tasks`);
    const q = query(tasksCollRef, orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id, created: doc.data().created?.toDate().getTime()})));
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeList]);

  return (
    <VStack minH='max-content' spacing={5}>
      {
        tasks &&
          (tasks.map(task => (
            <Task key={task.id} task={task} />
          )))
      }
    </VStack>
  );
};

export default Tasks;