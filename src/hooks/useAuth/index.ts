import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin as GoogleSignIn} from '@react-native-community/google-signin';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useCallback, useEffect, useRef, useState} from 'react';
import Config from 'react-native-config';
import {auth} from '../../conversions/Firebase';
// import {AccessToken, LoginManager} from 'react-native-fbsdk';

GoogleSignIn.configure({webClientId: Config.GOOGLE_SIGN_IN});

type UserOrNull = FirebaseAuthTypes.User | null;
type ConfirmOrNull = FirebaseAuthTypes.ConfirmationResult | null;

type UseAuth = {
  initializing: boolean;
  user: UserOrNull;
  error: string | null;
  loading: boolean;
  onEmail: (email: string, password: string) => void;
  onApple: () => void;
  onAnonymous: () => void;
  onPhone: (phone: string) => void;
  onPhoneConfirm: (code: string) => void;
  onFacebook: () => void;
  onGoogle: () => void;
  onLogout: () => void;
  onErrorClear: () => void;
  onPasswordReset: (email: string) => () => void;
};

export const useAuth = (): UseAuth => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<UserOrNull>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const confirm = useRef<ConfirmOrNull>(null);

  const onAuthStateChanged = useCallback(
    (userData: FirebaseAuthTypes.User | null) => {
      setUser(userData);
      setLoading(false);
      setInitializing(false);
    },
    [],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const onErrorClear = useCallback(() => setError(null), []);

  const onEmail = useCallback(async (email, password) => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setError(
        e.code === 'auth/email-already-in-use'
          ? 'That email address is already in use!'
          : e.code === 'auth/invalid-email'
          ? 'That email address is invalid!'
          : 'Unknown error on login',
      );
      setLoading(false);
    }
  }, []);

  const onPasswordReset = useCallback(
    (email) => async () => {
      try {
        await auth().sendPasswordResetEmail(email);
      } catch (e) {
        setError('Unknown error on password reset');
      }
    },
    [],
  );

  const onAnonymous = useCallback(async () => {
    setLoading(true);
    try {
      await auth().signInAnonymously();
    } catch (e) {
      setError(
        e.code === 'auth/operation-not-allowed'
          ? 'Anonymous sign in not enabled'
          : 'Unknown error on anonymous sign in',
      );
      setLoading(false);
    }
  }, []);

  const onApple = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken)
        throw 'Apple Sign-In failed - no identify token returned';
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      auth().signInWithCredential(appleCredential);
    } catch (e) {
      console.log(e);
      setError('Unknown error on apple sign in');
    }
  }, []);

  const onPhone = useCallback(async (phoneNumber: string) => {
    try {
      confirm.current = await auth().signInWithPhoneNumber(phoneNumber);
    } catch (e) {
      console.log(e);
      setError('Unknown error on phone sign in');
    }
  }, []);

  const onPhoneConfirm = useCallback(
    async (code: string) => {
      setLoading(true);
      try {
        const verification = confirm.current?.verificationId;
        if (!verification) throw new Error('missing confirm number');
        const cred = auth.PhoneAuthProvider.credential(verification, code);
        const userData = await auth().currentUser?.linkWithCredential(cred);
        if (!userData) throw new Error('missing use data on phone confirm');
        setUser(userData.user);
      } catch (e) {
        setError(
          e.code === 'auth/invalid-verification-code'
            ? 'Invalid code'
            : 'Account linking error',
        );
        setLoading(false);
      }
    },
    [confirm],
  );

  const onFacebook = useCallback(async () => {
    // const result = await LoginManager.logInWithPermissions([
    //   'public_profile',
    //   'email',
    // ]);
    // if (result.isCancelled) throw 'User cancelled the login process';
    // const data = await AccessToken.getCurrentAccessToken();
    // if (!data) throw 'Something went wrong obtaining access token';
    // const facebookCredential = auth.FacebookAuthProvider.credential(
    //   data.accessToken,
    // );
    // return auth().signInWithCredential(facebookCredential);
  }, []);

  const onGoogle = useCallback(async () => {
    setLoading(true);
    try {
      const {idToken} = await GoogleSignIn.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
    } catch (e) {
      setError('Unknown error google sign in');
      setLoading(false);
    }
  }, []);

  const onLogout = useCallback(async () => {
    setLoading(true);
    try {
      await auth().signOut();
    } catch (e) {
      setError(
        e.code === 'auth/no-current-user'
          ? 'No user signed in to log out'
          : 'Unknown error on sign out',
      );
      setLoading(false);
    }
  }, []);

  return {
    initializing,
    user,
    error,
    loading,

    onErrorClear,
    onEmail,
    onApple,
    onAnonymous,
    onPhone,
    onPhoneConfirm,
    onFacebook,
    onPasswordReset,
    onGoogle,
    onLogout,
  };
};
