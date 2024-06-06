'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ExtendedUser, UserLoginState } from '@kala-pavura/models';
import { FirebaseAuthErrorCodes, isFirebaseError } from '@kala-pavura/models';
import { Logger } from '@kala-pavura/services';

import { FirebaseAuthService } from '@/modules/services';
import { NotificationsService } from '@/modules/services/notifications.service';

type AuthContextType = {
  user: ExtendedUser | null;
  userLoggingState: UserLoginState;
  googleLogin: () => Promise<boolean>;
  passwordRegister: (
    userName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  passwordLogin: (emailAddress: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  userLoggingState: UserLoginState.LoadingData,
  googleLogin: async () => false,
  passwordRegister: async () => false,
  passwordLogin: async () => false,
  logout: async () => false,
});

const logger = new Logger('AuthContext');

type AuthContextProviderProps = {
  children: ReactNode;
};
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [kalaPavuraUser, setKalaPavuraUser] = useState<ExtendedUser | null>(
    null,
  );
  const [userLoggingState, setUserLoggingState] = useState<UserLoginState>(
    UserLoginState.LoadingData,
  );

  const googleLogin = async (): Promise<boolean> => {
    try {
      await FirebaseAuthService.googleLoginWithPopup((user: ExtendedUser) => {
        setKalaPavuraUser(user);
      });
      logger.log('User login with Google');
      return true;
    } catch (e) {
      logger.error('Error occurred while logging in with Google', e);
      return false;
    }
  };

  const passwordRegister = async (
    userName: string,
    emailAddress: string,
    password: string,
  ): Promise<boolean> => {
    try {
      await FirebaseAuthService.passwordRegister(
        userName,
        emailAddress,
        password,
        (user: ExtendedUser) => {
          setKalaPavuraUser(user);
        },
      );
      logger.log('User registered with email and password');
      return true;
    } catch (e) {
      if (!isFirebaseError(e)) {
        logger.error('Error occurred while registering user', e);
        return false;
      }
      switch (e.code) {
        case FirebaseAuthErrorCodes.EMAIL_ALREADY_EXISTS:
          NotificationsService.showErrorToast(
            'ඊ-තැපෑල දැනටමත් භාවිතයේ පවතී.',
            'මෙම ඊ-තැපෑල ඇසුරින් ගිණුමක් දැනටමත් පවතී. කරුණාකර එම ගිණුමෙන් පිරීම හෝ වෙනත් ලිපිනයක් භාවිත කරන්න.',
          );
          logger.error('Email already in use');
          return false;
        default:
          // TODO: Change error message
          NotificationsService.showErrorToast(
            'Unknown error occurred while registering user',
            'An unknown error occurred while registering user. Please try again later.',
          );
          logger.error('Error occurred while registering user', e);
          return false;
      }
    }
  };

  const passwordLogin = async (
    emailAddress: string,
    password: string,
  ): Promise<boolean> => {
    try {
      await FirebaseAuthService.passwordLogin(
        emailAddress,
        password,
        (user: ExtendedUser) => {
          setKalaPavuraUser(user);
        },
      );
      logger.log('User logged in with email and password');
      return true;
    } catch (e) {
      logger.error(
        'Error occurred while logging in with email and password',
        e,
      );
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await FirebaseAuthService.accountLogout();
      setKalaPavuraUser(null);
      logger.log('User logout');
      return true;
    } catch (e) {
      logger.error('Error occurred while logging out', e);
      return false;
    }
  };

  useEffect(() => {
    const loginStateChangeHandler = (userLoginState: UserLoginState) => {
      setUserLoggingState(userLoginState);
      logger.log('Auth state changed', userLoginState);
    };

    const unsubscribe = FirebaseAuthService.authStateChangeListener({
      updateLoginState: loginStateChangeHandler,
      setUser: (user: ExtendedUser | null) => {
        setKalaPavuraUser(user);
        logger.log('User auth state changed', user);
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
        passwordRegister,
        passwordLogin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
