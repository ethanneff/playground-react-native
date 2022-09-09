export const Analytics = {
  setUserId: (userId: string) => {
    return userId;
  },
  setUserProperties: (properties: { [key: string]: string | null }) => {
    return properties;
  },
  trackEvent: (event: Event, properties = {}) => {
    return { event, properties };
  },
  trackScreen: (currentRouteName: string) => {
    return currentRouteName;
  },
};
