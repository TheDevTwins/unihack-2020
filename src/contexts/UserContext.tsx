import React, { createContext, useEffect, useState } from 'react';

import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { projectAuth, projectFirestore } from 'firebase_config';
import { User } from './types';

type ContextProps = {
  loading: boolean;
  user: User;
  error: any;
  login: (email: string, password: string) => void;
  loggingIn: boolean;
  logout: () => void;
};

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loadingFirebaseUser] = useAuthState(projectAuth);

  const userDoc = projectFirestore.doc(`users/${firebaseUser?.uid || '1'}`);
  const [firestoreUser, loadingFirestoreUser] = useDocumentData<User>(userDoc);
  const [error, setError] = useState(null);

  const [loggingIn, setLoggingIn] = useState(false);

  // // Add user to database
  // useEffect(() => {
  //   if (!firebaseUser || firestoreUser) return;
  //
  //   const addUserToDatabase = async () =>
  //     await userDoc.set({
  //       uid: firebaseUser.uid,
  //       email: firebaseUser.email,
  //       displayName: firebaseUser.displayName,
  //     });
  //
  //   addUserToDatabase().then();
  // }, [firestoreUser, firebaseUser]);

  const login = async (email: string, password: string) => {
    setLoggingIn(true);
    try {
      await projectAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await projectAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
    }
    setLoggingIn(false);
  };

  const logout = async () => {
    await projectAuth.signOut();
  };


  return (
    <UserContext.Provider
      value={{
        user: firestoreUser || (undefined as any),
        loading: loadingFirebaseUser || loadingFirestoreUser,
        error,
        login,
        loggingIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
