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
} from 'firebase/firestore';
import { useColorModeValue } from "@chakra-ui/react";

import { auth, db } from '../firebase/firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState();
  const [tasks, setTasks] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [deletedLists, setDeletedLists] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState(null);
  const [userColor, setUserColor] = useState('dark');
  const [isLoading, setLoading] = useState(true);

    // ** Auth functions ** //
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userID = user.uid;
        writeUserData(userID, email);
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

  const writeUserData = async (userID, email) => {
    await setDoc(doc(db, "users", userID), {
      email: email,
      id: userID,
      userColor: userColor,
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

// ** see 'deleteTask' below for explanation of how 'deleteList' works ** //
const deleteList = async (list) => {
  let newDeletedLists;
  const tasksToDelete = [];

  const listRef = doc(db, `users/${currentUser.uid}/lists`, `${list.title}`);

  const tasksRef = collection(db, `users/${currentUser.uid}/lists/${list.title}/tasks`);

  const tasksSnapshot = await getDocs(tasksRef);
  tasksSnapshot.forEach(doc => {
    tasksToDelete.push(doc.data());
  });

  setDeletedLists(() => {
    let copy = deletedLists;
    const listCopy = list;
    listCopy.tasks = tasksToDelete;
    if (copy === null) {
      newDeletedLists = [listCopy];
    } else {
      newDeletedLists = [...copy, listCopy];
    }

    return newDeletedLists;
  });

  console.log(tasksToDelete);

  for (let i = 0; i < tasksToDelete.length; i++) {
    const individualTaskRefs = await doc(db, `users/${currentUser.uid}/lists/${list.title}/tasks/${tasksToDelete[i].id}`);
    await deleteDoc(individualTaskRefs);
  }

  await deleteDoc(listRef);
};

const undoDeleteList = async () => {};

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
  const subTaskIDs = [];

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

  // ** get all the subtasks of the deleted task ** //
  const subTasksRef = collection(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${task.id}/subTasks`);
  const subTasksSnapshot = await getDocs(subTasksRef);

  // ** push each subtask into an array of the subtask IDs ** //
  subTasksSnapshot.forEach(doc => {
    subTaskIDs.push(doc.id);
  });

  // ** iterate through the subtaskIDs array ** //
  for(let i = 0; i < subTaskIDs.length; i++) {
    // ** create a new ref for each of the subTaskIDs ** //
    const individualSubTaskRefs = await doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${task.id}/subTasks`, `${subTaskIDs[i]}`);
    // ** delete each subTask doc from firestore using the subTaskID to query the DB ** //
    await deleteDoc(individualSubTaskRefs);
  }
  // ** finally delete the actual task ** //
  await deleteDoc(doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks`, `${task.id}`));
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

const checkTask = async (taskID, isChecked) => {
  const taskRef = doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks/${taskID}`);
  await updateDoc(taskRef, {
    isChecked: !isChecked,
  })
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const modeColor = useColorModeValue('light', 'dark');
  const notModeColor = useColorModeValue('dark', 'light');

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        lists,
        setLists,
        deleteList,
        updateListTitle,
        tasks,
        setTasks,
        subTasks,
        setSubTasks,
        userColor,
        setUserColor,
        deleteTask,
        undoDeleteTask,
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
        modeColor,
        notModeColor,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
