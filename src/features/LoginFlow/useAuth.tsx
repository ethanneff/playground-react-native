import {useCallback, useEffect, useRef, useState} from 'react';
import Config from 'react-native-config';
import {
  appleAuth,
  auth,
  FirebaseAuthTypes,
  GoogleSignin,
} from '../../conversions';

// import {AccessToken, LoginManager} from 'react-native-fbsdk';

GoogleSignin.configure({webClientId: Config.GOOGLE_SIGN_IN});

type UseAuth = {
  response: Response;
  onEmail: (email: string, password: string) => void;
  onApple: () => void;
  onAnonymous: () => void;
  onPhone: (phone: string) => void;
  onPhoneConfirm: (code: string) => void;
  onFacebook: () => void;
  onGoogle: () => void;
  onLogout: () => void;
  onPasswordReset: (email: string) => void;
};

type NullType = 'initalizing' | 'waiting' | 'logout' | 'loading';
type Response =
  | {type: NullType; error: null; user: null}
  | {type: 'error'; error: string; user: null}
  | {type: 'login'; error: null; user: FirebaseAuthTypes.User};

const initialResponse: Response = {
  type: 'initalizing',
  user: null,
  error: null,
};

export const useAuth = (): UseAuth => {
  const [response, setResponse] = useState<Response>(initialResponse);
  const confirm = useRef<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) setResponse({...initialResponse, type: 'login', user});
    else setResponse({...initialResponse, type: 'logout'});
  }, []);

  const onEmail = useCallback(
    async (m: string, p: string) => {
      try {
        setResponse({...initialResponse, type: 'loading'});
        const {user} = await auth().createUserWithEmailAndPassword(m, p);
        setResponse({...initialResponse, type: 'login', user});
      } catch (e) {
        setResponse({...initialResponse, type: 'error', error: e});
      }
    },
    [setResponse],
  );

  const onPasswordReset = useCallback(
    async (email: string) => {
      try {
        setResponse({...initialResponse, type: 'loading'});
        await auth().sendPasswordResetEmail(email);
        setResponse({...initialResponse, type: 'waiting'});
      } catch (e) {
        setResponse({...initialResponse, type: 'error', error: e});
      }
    },
    [setResponse],
  );

  const onAnonymous = useCallback(async () => {
    try {
      setResponse({...initialResponse, type: 'loading'});
      const {user} = await auth().signInAnonymously();
      setResponse({...initialResponse, type: 'login', user});
    } catch (e) {
      setResponse({...initialResponse, type: 'error', error: e});
    }
  }, [setResponse]);

  const onApple = useCallback(async () => {
    try {
      setResponse({...initialResponse, type: 'loading'});
      const res = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!res.identityToken) throw new Error('missing identify token');
      const {identityToken, nonce} = res;
      const cred = auth.AppleAuthProvider.credential(identityToken, nonce);
      const {user} = await auth().signInWithCredential(cred);
      setResponse({...initialResponse, type: 'login', user});
    } catch (e) {
      setResponse({...initialResponse, type: 'error', error: e});
    }
  }, [setResponse]);

  const onPhone = useCallback(
    async (phoneNumber: string) => {
      try {
        setResponse({...initialResponse, type: 'loading'});
        await auth().signInWithPhoneNumber(phoneNumber);
        setResponse({...initialResponse, type: 'waiting'});
      } catch (e) {
        setResponse({...initialResponse, type: 'error', error: e});
      }
    },
    [setResponse],
  );

  const onPhoneConfirm = useCallback(
    async (code: string) => {
      try {
        setResponse({...initialResponse, type: 'loading'});
        const verification = confirm.current?.verificationId;
        if (!verification) throw new Error('missing verification id');
        const cred = auth.PhoneAuthProvider.credential(verification, code);
        const userData = await auth().currentUser?.linkWithCredential(cred);
        if (!userData) throw new Error('missing user data on phone confirm');
        setResponse({...initialResponse, user: userData.user, type: 'login'});
      } catch (e) {
        setResponse({...initialResponse, type: 'error', error: e});
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
      setResponse({...initialResponse, type: 'loading'});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const {user} = await auth().signInWithCredential(googleCredential);
      setResponse({...initialResponse, type: 'login', user});
    } catch (e) {
      setResponse({...initialResponse, type: 'error', error: e});
    }
  }, [setResponse]);

  const onLogout = useCallback(async () => {
    try {
      setResponse({...initialResponse, type: 'loading'});
      await auth().signOut();
      setResponse({...initialResponse, type: 'logout'});
    } catch (e) {
      setResponse({...initialResponse, type: 'error', error: e});
    }
  }, [setResponse]);

  return {
    response,
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
