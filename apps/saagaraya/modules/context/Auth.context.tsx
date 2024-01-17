'use client';

import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { KalaPavuraExtendedUser, UserLoginState } from '@kala-pavura/models';
import { Logger } from '@kala-pavura/services';

import {
  accountLogout,
  authStateChangeListener,
  googleLoginWithPopup,
} from '@/modules/services';

type AuthContextType = {
  user: KalaPavuraExtendedUser | null;
  userLoggingState: UserLoginState;
  googleLogin: (() => Promise<void>) | null;
  logout: (() => Promise<void>) | null;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  userLoggingState: UserLoginState.LoadingData,
  googleLogin: null,
  logout: null,
});

const logger = new Logger('AuthContext');

type AuthContextProviderProps = {
  children: ReactElement;
};
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [kalaPavuraUser, setKalaPavuraUser] =
    useState<KalaPavuraExtendedUser | null>(null);
  const [userLoggingState, setUserLoggingState] = useState<UserLoginState>(
    UserLoginState.LoadingData,
  );

  const googleLogin = async () => {
    logger.log('User login with Google');
    await googleLoginWithPopup((user: KalaPavuraExtendedUser) => {
      setKalaPavuraUser(user);
    });
  };

  const logout = async () => {
    logger.log('User logout');
    await accountLogout();
    setKalaPavuraUser(null);
  };

  useEffect(() => {
    const loginStateChangeHandler = (userLoginState: UserLoginState) => {
      logger.log('Auth state changed', userLoginState);
      setUserLoggingState(userLoginState);
    };

    const unsubscribe = authStateChangeListener({
      updateLoginState: loginStateChangeHandler,
      setUser: (user: KalaPavuraExtendedUser | null) => {
        setKalaPavuraUser(user);
        console.log('User', user);
      },
    });

    return () => unsubscribe();
  }, [kalaPavuraUser?.uid]);

  return (
    <AuthContext.Provider
      value={{
        user: kalaPavuraUser,
        userLoggingState,
        googleLogin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
