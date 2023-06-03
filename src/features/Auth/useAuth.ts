import { useCallback, useEffect } from 'react';
import Config from 'react-native-config';
import { Toast } from '../../components';
import {
  Apple,
  Facebook,
  Firebase,
  GoogleSignin,
  type FirebaseAuthTypes,
} from '../../conversions';

export const useAuth = () => {
  const handleError = useCallback((e: unknown) => {
    const description =
      e instanceof Error
        ? e.message
        : (e as FirebaseAuthTypes.NativeFirebaseAuthError).nativeErrorMessage;
    Toast.show({
      props: { description, title: 'Unable to sign in' },
      type: 'negative',
    });
  }, []);

  const signInAnonymously = useCallback(async () => {
    try {
      return await Firebase.auth().signInAnonymously();
    } catch (e) {
      handleError(e);
      return null;
    }
  }, [handleError]);

  const signInFacebook = useCallback(async () => {
    try {
      const result = await Facebook.LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
      const data = await Facebook.AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const facebookCredential = Firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      return await Firebase.auth().signInWithCredential(facebookCredential);
    } catch (e) {
      handleError(e);
      return null;
    }
  }, [handleError]);

  const signInApple = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await Apple.performRequest({
        requestedOperation: Apple.Operation.LOGIN,
        requestedScopes: [Apple.Scope.EMAIL, Apple.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
      const { identityToken, nonce, user } = appleAuthRequestResponse;
      const credentialState = await Apple.getCredentialStateForUser(user);
      if (credentialState !== Apple.State.AUTHORIZED) {
        throw new Error('Apple Sign-In failed - not authorized');
      }
      const appleCredential = Firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      return await Firebase.auth().signInWithCredential(appleCredential);
    } catch (e) {
      handleError(e);
      return null;
    }
  }, [handleError]);

  const signInGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential =
        Firebase.auth.GoogleAuthProvider.credential(idToken);
      return await Firebase.auth().signInWithCredential(googleCredential);
    } catch (e) {
      handleError(e);
      return null;
    }
  }, [handleError]);

  const signInEmail = useCallback(
    async (email: string, password: string) => {
      try {
        return await Firebase.auth().signInWithEmailAndPassword(
          email.trim(),
          password,
        );
      } catch (e) {
        handleError(e);
        return null;
      }
    },
    [handleError],
  );

  const signUpEmail = useCallback(
    async (email: string, password: string) => {
      try {
        return await Firebase.auth().createUserWithEmailAndPassword(
          email.trim(),
          password,
        );
      } catch (e) {
        handleError(e);
        return null;
      }
    },
    [handleError],
  );

  const resetPassword = useCallback(
    async (email: string) => {
      try {
        await Firebase.auth().sendPasswordResetEmail(email.trim());
      } catch (e) {
        handleError(e);
      }
    },
    [handleError],
  );

  const logout = useCallback(async () => {
    try {
      await Firebase.auth().signOut();
    } catch (e) {
      handleError(e);
    }
  }, [handleError]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_SIGN_IN,
    });
    Facebook.Settings.setAppID(Config.FACEBOOK_APP_ID ?? '');
  }, []);

  return {
    logout,
    resetPassword,
    signInAnonymously,
    signInApple,
    signInEmail,
    signInFacebook,
    signInGoogle,
    signUpEmail,
  };
};
