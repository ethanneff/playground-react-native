import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-community/google-signin';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useCallback, useEffect, useState} from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {auth} from '../../../../conversions/Firebase';

GoogleSignin.configure({
  webClientId: '',
});

export const useAuth = (): any => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const onEmail = useCallback((email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use')
          console.log('That email address is already in use!');
        if (error.code === 'auth/invalid-email')
          console.log('That email address is invalid!');
        console.error(error);
      });
  }, []);

  const onAnonymous = useCallback(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed')
          console.log('Enable anonymous in your firebase console.');

        console.error(error);
      });
  }, []);

  const onApple = useCallback(async () => {
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
    return auth().signInWithCredential(appleCredential);
  }, []);

  const onPhone = useCallback(async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }, []);

  const onPhoneConfirm = useCallback(
    async (code: string) => {
      try {
        const credential = auth.PhoneAuthProvider.credential(
          confirm.verificationId,
          code,
        );
        const userData = await auth().currentUser?.linkWithCredential(
          credential,
        );
        setUser(userData.user);
      } catch (error) {
        if (error.code == 'auth/invalid-verification-code')
          console.log('Invalid code.');
        else console.log('Account linking error');
      }
    },
    [confirm],
  );

  const onFacebook = useCallback(async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) throw 'User cancelled the login process';
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) throw 'Something went wrong obtaining access token';
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
  }, []);

  const onGoogle = useCallback(async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }, []);

  const onLogout = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, []);

  return {
    initializing,
    user,
    onEmail,
    onApple,
    onAnonymous,
    onPhone,
    onPhoneConfirm,
    onFacebook,
    onGoogle,
    onLogout,
  };
};
