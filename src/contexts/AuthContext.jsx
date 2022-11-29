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
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { auth, db, addList, addTask } from '../firebase/firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState();
  const [tasks, setTasks] = useState([]);
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
    });
  };

  // ** Database functions ** //

const addList = async (list) => {
  const userRef = doc(db, `users/${currentUser.uid}`);
  await setDoc(doc(userRef, "lists", list.title), list);
};

const addTask = async (task) => {
  const listRef = await doc(db, `users/${currentUser.uid}/lists/${activeList.title}`);
  await setDoc(doc(listRef, "tasks", task.id), task);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        lists,
        setLists,
        tasks,
        setTasks,
        deleteTask,
        checkTask,
        login,
        logout,
        signup,
        resetPassword,
        changeEmail,
        changePassword,
        addList,
        addTask,
        activeList,
        setActiveList,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
