
import React, { useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import {
  VStack,
  Heading,
  Box,
  Divider,
} from '@chakra-ui/react';

import { db } from '../../firebase/firebase';
import { useAuth } from '../../hooks/useAuth';
import AddTask from './AddTask';
import Task from './Task';
import TaskFooter from './TaskFooter';

const Tasks = () => {
  const {
    currentUser,
    activeList,
    tasks,
    setTasks,
    modeColor,
    notModeColor,
  } = useAuth();

  useEffect(() => {
    const tasksCollRef = collection(db, `users/${currentUser.uid}/lists/${activeList?.title}/tasks`);
    const q = query(tasksCollRef, orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // setTasks(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id, created: (doc.data().created?.toDate().getTime())})));
      setTasks(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeList]);

  return (
    <VStack
      minH='max-content'
      minW='60vw'
      spacing={5}
      bg={notModeColor}
      borderRadius={19}
      mb={20}
    >
      <Box mb={10}>
        <AddTask />
      </Box>
      {
        tasks &&
          (tasks.map(task => (
            <Task key={task.id} task={task} />
          )))
      }
      <TaskFooter />
    </VStack>
  );
};

export default Tasks;