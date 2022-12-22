import React, { useEffect, useState } from 'react';
import {
  HStack,
  Text,
} from '@chakra-ui/react';
import {
  collection,
  query,
  onSnapshot
} from 'firebase/firestore';

import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebase/firebase';

const initialText = {
  total: 0,
  done: 0,
  remaining: 0,
};

const TaskFooter = () => {
  const [text, setText] = useState(initialText);
  const {
    modeColor,
    tasks,
    completedTasks,
    setCompletedTasks,
    currentUser,
    activeList,
  } = useAuth();

  useEffect(() => {
    const deletedTasksRef = collection(db, `users/${currentUser.uid}/lists/${activeList?.title}/completed-tasks`);
    const q = query(deletedTasksRef);

    const unsubscribe = onSnapshot(collection(db, `users/${currentUser.uid}/lists/${activeList?.title}/completed-tasks`), (querySnapshot) => {
      setCompletedTasks(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   setCompletedTasks(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    // })

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const remaining = (tasks?.length - completedTasks?.length);

    const counts = {
      total: tasks?.length >= 0 ? tasks.length : 0,
      done: completedTasks?.length >= 0 ? completedTasks.length : 0,
      remaining: remaining >= 0 ? remaining : 0,
    };

    setText(counts);
  }, [tasks, completedTasks])
  // const counts = {
  //   total: tasks?.length,
  //   done: completedTasks?.length,
  //   remaining: tasks?.length - completedTasks?.length
  // };

  return (
    <HStack
      h={15}
      w='100%'
      pt={5}
      pb={10}
      align='center'
      justify='center'
      color={modeColor}
    >
      <Text>
        {`Total: ${text.total}`}
      </Text>
      <Text>
        {`Completed: ${text.done}`}
      </Text>
      <Text>
        {`Remaining: ${text.remaining}`}
      </Text>
    </HStack>
  );
};

export default TaskFooter;