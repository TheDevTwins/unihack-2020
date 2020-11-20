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
  logout: () => void;
};

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loadingFirebaseUser] = useAuthState(projectAuth);

  const userDoc = projectFirestore.doc(`users/${firebaseUser?.uid || '1'}`);
  const [firestoreUser, loadingFirestoreUser] = useDocumentData<User>(userDoc);
  const [error, setError] = useState(null);

  // Add user to database
  useEffect(() => {
    if (!firebaseUser || firestoreUser) return;

    const addUserToDatabase = async () =>
      await userDoc.set({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });

    addUserToDatabase().then();
  }, [firestoreUser, firebaseUser]);

  const login = async (email: string, password: string) => {
    try {
      await projectAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await projectAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    await projectAuth.signOut();
  };

  console.log({ firestoreUser });

  return (
    <UserContext.Provider
      value={{
        user: firestoreUser || (undefined as any),
        loading: loadingFirebaseUser || loadingFirestoreUser,
        error,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
