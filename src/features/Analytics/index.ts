import analytics from '@react-native-firebase/analytics';

type Event = 'login';

export const Analytics = {
  setUserId: async (userId: string) => {
    await analytics().setUserId(userId);
  },
  setUserProperties: async (properties: { [key: string]: string | null }) => {
    await analytics().setUserProperties(properties);
  },
  trackEvent: async (event: Event, properties = {}) => {
    await analytics().logEvent(event, properties);
  },
  trackScreen: async (currentRouteName: string) => {
    await analytics().logScreenView({
      screen_class: currentRouteName, // eslint-disable-line camelcase
      screen_name: currentRouteName, // eslint-disable-line camelcase
    });
  },
};

// logPurchase
// logRefund
// logRemoveFromCart
// logShare
// logSignUp
// logViewCart
// logViewPromotion
// logLogin
// logAppOpen
// logAddToCart
// logAddPaymentInfo
