/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import {
  collection,
  query,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import { useColorModeValue } from "@chakra-ui/react";

import { auth, db } from '../firebase/firebase';

export const AuthContext = createContext();

const initialName = {
  first: '',
  last: ''
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState(initialName);
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [deletedLists, setDeletedLists] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState(null);
  const [userColor, setUserColor] = useState('dark');
  const [isLoading, setLoading] = useState(true);

    // ** Auth functions ** //
  const signup = (data) => {
    const { email, password } = data;
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userID = user.uid;
        writeUserData(userID, data);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const changeEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const changePassword = (password) => {
    return updatePassword(currentUser, password);
  };

  const writeUserData = async (userID, data) => {
    const { email, firstName, lastName } = data;
    await setDoc(doc(db, "users", userID), {
      email: email,
      id: userID,
      name: [lastName, firstName],
      // userColor: userColor,
    });
  };

  const changeName = async (newNames) => {
    const { first, last } = newNames;
    const userRef = doc(db, `users/${currentUser.uid}`);

    await updateDoc(userRef, {
      name: [last, first]
    });
  };

  // ** Database functions ** //

const updateUserColor = async (color) => {
  const userRef = doc(db, `users/${currentUser.uid}`);

  await updateDoc(userRef, {
    userColor: color
  })
};

const addList = async (list) => {
  const userRef = doc(db, `users/${currentUser.uid}`);
  await setDoc(doc(userRef, "lists", list.title), list);
};

const addTask = async (task) => {
  const listRef = await doc(db, `users/${currentUser.uid}/lists/${activeList.title}`);
  await setDoc(doc(listRef, "tasks", task.id), task);
};

const completeTask = async (task, isChecked) => {
  const listRef = await doc(db, `users/${currentUser.uid}/lists/${activeList.title}`);
  const completedTaskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/completed-tasks/${task.id}`);
  const taskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${task.id}`);
  await updateDoc(taskRef, {
    isChecked: !isChecked,
  });

  const setTask = async () => {
    await setDoc(doc(listRef, "completed-tasks", task.id), task);
  };
  const deleteTaskFromCompleted = async () => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/lists/${activeList.title}/completed-tasks`, `${task.id}`));
    const filteredCompletedTasks = completedTasks.filter(t => t.id !== task.id);

    await setCompletedTasks(filteredCompletedTasks);
  };

  !isChecked ? setTask() : deleteTaskFromCompleted();
};

// ** see 'deleteTask' below for explanation of how 'deleteList' works ** //
const deleteList = async (list) => {
  let newDeletedLists;
  const listRef = doc(db, `users/${currentUser.uid}/lists`, `${list.title}`);

  // !! this will add the newly deleted list to the local state of deletedLists Lol !! //
  // !! this list containing all recently deleted lists is necessary for undo functionality !! //
  setDeletedLists(() => {
    let copy = deletedLists;
    const listCopy = list;
    if (copy === null) {
      newDeletedLists = [listCopy];
    } else {
      newDeletedLists = [...copy, listCopy];
    }

    return newDeletedLists;
  });

  await deleteDoc(listRef);
};

const updateListTitle = async (targetedList, newTitle) => {
  // const prevTargetedRef = doc(db, `users/${currentUser.uid}/lists`, `${targetedList.title}`);
  // await updateDoc(prevTargetedRef, {
  //   created: new Date()
  // })
  // await setDoc(doc(db, `users/${currentUser.uid}/lists`, newTitle), targetedList);

  // const newTargetedRef = doc(db, `users/${currentUser.uid}/lists`, `${newTitle}`);
  // await updateDoc(newTargetedRef, {
  //   title: newTitle,
  // });
  // await deleteList(targetedList.title);
};

const deleteTask = async (task) => {
  let newDeletedTasks;

  // ** set the state value by either: ** //
    // ** creating an array with the first/only entry being the task that was just deleted ** //
    // ** or if an array of deleted tasks already exists, add the newest one to the list ** //
  setDeletedTasks(() => {
    let copy = deletedTasks;
    if (copy === null) {
      newDeletedTasks = [task];
    } else {
      newDeletedTasks = [...copy, task];
    }

    return newDeletedTasks;
  });

  // ** delete the actual task ** //
  await deleteDoc(doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks`, `${task.id}`));
};

const undoDeleteList = async () => {
  const undeletedList = deletedLists.pop();
  const filteredDeletedLists = deletedLists.filter(list => (
    list.listID !== undeletedList.listID
  ));
  console.log('AuthContext - undoDeleteList - UNDELETED LIST: ', undeletedList);

  if (!deletedLists.length) {
    await setDeletedLists(null);
  } else {
    await setDeletedLists(filteredDeletedLists);
  }

  await addList(undeletedList);
};

const undoDeleteTask = async () => {
  const undeletedTask = deletedTasks.pop();
  const filteredDeletedTasks = deletedTasks.filter(task => (
    task.id !== undeletedTask.id
  ));
  if (!deletedTasks.length) {
    await setDeletedTasks(null);
  } else {
    await setDeletedTasks(filteredDeletedTasks);
  }

  await addTask(undeletedTask);
};

const checkTask = async (task, isChecked) => {
  const taskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${task.id}`);
  await updateDoc(taskRef, {
    isChecked: !isChecked,
  });
  await completeTask(task, isChecked);
};

const expandTask = async (taskID, isExpanded) => {
  const taskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${taskID}`);
  await updateDoc(taskRef, {
    isExpanded: !isExpanded,
  })
};

const addSubTask = async (taskID, subTask) => {
  const taskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${taskID}`);
  await setDoc(doc(taskRef, "subTasks", subTask.id), subTask);
};

const updatePriority = async (taskID, priority) => {
  const priorities = {
    'LOW': {
      type: 'low',
      bg: 'green.200',
      color: 'green.700',
    },
    'MED': {
      type: 'medium',
      bg: 'orange.300',
      color: 'orange.800',
    },
    'HIGH': {
      type: 'high',
      bg: 'red.300',
      color: 'red.800',
    },
  };

  const taskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${taskID}`);
  // await updateDoc(taskRef, {
  //   priority: priority,
  // })
  await updateDoc(taskRef, {
    priority: priorities[`${priority}`],
  })
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('SUBTASKS: ', subTasks);
  }, [subTasks]);

  const modeColor = useColorModeValue('light', 'dark');
  const notModeColor = useColorModeValue('dark', 'light');

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        name,
        setName,
        changeName,
        lists,
        setLists,
        deleteList,
        updateListTitle,
        tasks,
        setTasks,
        completedTasks,
        setCompletedTasks,
        completeTask,
        subTasks,
        setSubTasks,
        userColor,
        setUserColor,
        deleteTask,
        undoDeleteList,
        undoDeleteTask,
        deletedLists,
        deletedTasks,
        expandTask,
        checkTask,
        login,
        logout,
        signup,
        resetPassword,
        changeEmail,
        changePassword,
        addList,
        addTask,
        addSubTask,
        activeList,
        setActiveList,
        updateUserColor,
        updatePriority,
        modeColor,
        notModeColor,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
