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

const deleteList = async (listTitle) => {
  const taskIDs = []
  await deleteDoc(doc(db, `users/${currentUser.uid}/lists`, `${listTitle}`))
    .then(async () => {
      const tasksQuery = query(collection(db, `users/${currentUser.uid}/lists/${listTitle}/tasks`));
      const taskSnapshot = await getDocs(tasksQuery);
      taskSnapshot.forEach((doc) => {
        taskIDs.push(doc.data().id);
      });
    }).finally(async () => {
      for (let i = 0; i < taskIDs.length; i++) {
        await deleteDoc(doc(db, `users/${currentUser.uid}/lists/${listTitle}/tasks/${taskIDs[i]}`));
      }
    })
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

const deleteTask = async (taskID) => {
  await deleteDoc(doc(db, `users/${currentUser.uid}/lists/${activeList.title}/tasks`, `${taskID}`));
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
