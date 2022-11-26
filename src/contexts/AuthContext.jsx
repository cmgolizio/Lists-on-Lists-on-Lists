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
  doc,
} from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [lists, setLists] = useState();
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


  // ** Database functions ** //
  const writeUserData = async (userID, email) => {
    try {
      await setDoc(doc(db, 'users', userID), {
        email: email,
        id: userID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addList = async (list) => {
    try {
      const userID = currentUser.uid;
      const userRef = doc(db, `users/${userID}`)
      await setDoc(doc(userRef, 'lists', list.title), list);
      // console.log('LIST REF FROM AuthContext: ', listRef)
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (listTitle, task) => {
    try {
      const userID = currentUser.uid;
      const listRef = doc(db, `users/${userID}/lists/${listTitle}`)
      await setDoc(doc(listRef, 'tasks', task.title), task);
    } catch (error) {
      console.log(error);
    }
  };

  // const getLists = async () => {
  //   const lists = {};
  //   try {
  //     const userID = currentUser.uid;
  //     const listsSnapshot = await getDocs(collection(db, `users/${userID}/lists`));
  //     listsSnapshot.forEach((doc) => {
  //       lists[`${doc.data().listID}`] = doc.data()
  //     });
  //     setLists(lists);
  //     return lists;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return lists;
  // };

  // const getOneList = async (listID) => {

  // };

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
        login,
        logout,
        signup,
        resetPassword,
        changeEmail,
        changePassword,
        addList,
        addTask,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
