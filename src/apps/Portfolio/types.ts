import { StackNavigationProp } from '@react-navigation/stack';

export type PortfolioRoutes = {
  landing: undefined;
  login: undefined;
  forgotPassword: undefined;
  home: undefined;
  notFound: undefined;
  settings: undefined;
};

export type PortfolioNavigation = StackNavigationProp<PortfolioRoutes>;
