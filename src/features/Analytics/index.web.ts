export const Analytics = {
  trackScreen: (currentRouteName: string) => {
    return currentRouteName;
  },
  trackEvent: (event: Event, properties = {}) => {
    return { event, properties };
  },
  setUserId: (userId: string) => {
    return userId;
  },
  setUserProperties: (properties: { [key: string]: string | null }) => {
    return properties;
  },
};
