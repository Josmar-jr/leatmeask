import { createContext, useEffect, useState } from 'react';

import { firebase, auth } from 'services/firebase';

type User = {
  uid: string;
  name: string;
  email: string;
  provider: string;
  photoUrl: string;
};

type AuthContextType = {
  user: User;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => verifyUser(user));

    return () => unsubscribe();
  }, []);

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    const { user: newUser } = await auth.signInWithPopup(provider);

    verifyUser(newUser);
  }

  function verifyUser(rawUser: any) {
    if (rawUser) {
      const user = formatUser(rawUser);

      setUser(user);
    }
  }

  async function signOut() {
    await auth.signOut();

    setUser(false);
  }

  return (
    <AuthContext.Provider value={{ signInWithGithub, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const formatUser = (user): User => {
  return {
    uid: user?.uid,
    email: user?.email,
    name: user?.displayName,
    provider: user?.providerData[0].providerId,
    photoUrl: user?.photoURL,
  };
};
