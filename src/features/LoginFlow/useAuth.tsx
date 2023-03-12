import { useCallback, useEffect, useRef, useState } from 'react';
import {
  appleAuth,
  Firebase,
  GoogleSignin,
  type FirebaseAuthTypes,
} from '../../conversions';

// import {AccessToken, LoginManager} from 'react-native-fbsdk';

// GoogleSignin.configure({ webClientId: Config.GOOGLE_SIGN_IN });

type NullType = 'initializing' | 'loading' | 'logout' | 'waiting';
type Response =
  | { error: null; type: 'login'; user: FirebaseAuthTypes.User }
  | { error: null; type: NullType; user: null }
  | { error: string; type: 'error'; user: null };

type UseAuth = {
  onAnonymous: () => void;
  onApple: () => void;
  onEmail: (email: string, password: string) => void;
  onFacebook: () => void;
  onGoogle: () => void;
  onLogout: () => void;
  onPasswordReset: (email: string) => void;
  onPhone: (phone: string) => void;
  onPhoneConfirm: (code: string) => void;
  response: Response;
};

const initialResponse: Response = {
  error: null,
  type: 'initializing',
  user: null,
};

export const useAuth = (): UseAuth => {
  const [response, setResponse] = useState<Response>(initialResponse);
  const confirm = useRef<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    const user = Firebase.auth().currentUser;
    if (user) setResponse({ ...initialResponse, type: 'login', user });
    else setResponse({ ...initialResponse, type: 'logout' });
  }, []);

  const onEmail = useCallback(
    async (m: string, p: string) => {
      try {
        setResponse({ ...initialResponse, type: 'loading' });
        const { user } = await Firebase.auth().createUserWithEmailAndPassword(
          m,
          p,
        );
        setResponse({ ...initialResponse, type: 'login', user });
      } catch (e) {
        if (e instanceof Error)
          setResponse({ ...initialResponse, error: e.message, type: 'error' });
      }
    },
    [setResponse],
  );

  const onPasswordReset = useCallback(
    async (email: string) => {
      try {
        setResponse({ ...initialResponse, type: 'loading' });
        await Firebase.auth().sendPasswordResetEmail(email);
        setResponse({ ...initialResponse, type: 'waiting' });
      } catch (e) {
        if (e instanceof Error)
          setResponse({ ...initialResponse, error: e.message, type: 'error' });
      }
    },
    [setResponse],
  );

  const onAnonymous = useCallback(async () => {
    try {
      setResponse({ ...initialResponse, type: 'loading' });
      const { user } = await Firebase.auth().signInAnonymously();
      setResponse({ ...initialResponse, type: 'login', user });
    } catch (e) {
      if (e instanceof Error)
        setResponse({ ...initialResponse, error: e.message, type: 'error' });
    }
  }, [setResponse]);

  const onApple = useCallback(async () => {
    try {
      setResponse({ ...initialResponse, type: 'loading' });
      const res = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!res.identityToken) throw new Error('missing identify token');
      const { identityToken, nonce } = res;
      const cred = Firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const { user } = await Firebase.auth().signInWithCredential(cred);
      setResponse({ ...initialResponse, type: 'login', user });
    } catch (e) {
      if (e instanceof Error)
        setResponse({ ...initialResponse, error: e.message, type: 'error' });
    }
  }, [setResponse]);

  const onPhone = useCallback(
    async (phoneNumber: string) => {
      try {
        setResponse({ ...initialResponse, type: 'loading' });
        await Firebase.auth().signInWithPhoneNumber(phoneNumber);
        setResponse({ ...initialResponse, type: 'waiting' });
      } catch (e) {
        if (e instanceof Error)
          setResponse({ ...initialResponse, error: e.message, type: 'error' });
      }
    },
    [setResponse],
  );

  const onPhoneConfirm = useCallback(
    async (code: string) => {
      try {
        setResponse({ ...initialResponse, type: 'loading' });
        const verification = confirm.current?.verificationId;
        if (!verification) throw new Error('missing verification id');
        const cred = Firebase.auth.PhoneAuthProvider.credential(
          verification,
          code,
        );
        const userData = await Firebase.auth().currentUser?.linkWithCredential(
          cred,
        );
        if (!userData) throw new Error('missing user data on phone confirm');
        setResponse({ ...initialResponse, type: 'login', user: userData.user });
      } catch (e) {
        if (e instanceof Error)
          setResponse({ ...initialResponse, error: e.message, type: 'error' });
      }
    },
    [setResponse],
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
    try {
      setResponse({ ...initialResponse, type: 'loading' });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential =
        Firebase.auth.GoogleAuthProvider.credential(idToken);
      const { user } = await Firebase.auth().signInWithCredential(
        googleCredential,
      );
      setResponse({ ...initialResponse, type: 'login', user });
    } catch (e) {
      if (e instanceof Error)
        setResponse({ ...initialResponse, error: e.message, type: 'error' });
    }
  }, [setResponse]);

  const onLogout = useCallback(async () => {
    try {
      setResponse({ ...initialResponse, type: 'loading' });
      await Firebase.auth().signOut();
      setResponse({ ...initialResponse, type: 'logout' });
    } catch (e) {
      if (e instanceof Error)
        setResponse({ ...initialResponse, error: e.message, type: 'error' });
    }
  }, [setResponse]);

  return {
    onAnonymous,
    onApple,
    onEmail,
    onFacebook,
    onGoogle,
    onLogout,
    onPasswordReset,
    onPhone,
    onPhoneConfirm,
    response,
  };
};
