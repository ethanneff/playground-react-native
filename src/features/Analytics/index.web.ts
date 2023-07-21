export const Analytics = {
  setUserId: (userId: string) => userId,
  setUserProperties: (properties: Record<string, string | null>) => properties,
  trackEvent: (event: Event, properties = {}) => ({ event, properties }),
  trackScreen: (currentRouteName: string) => currentRouteName,
};
