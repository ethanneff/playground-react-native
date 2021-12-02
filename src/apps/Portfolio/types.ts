import { StackNavigationProp } from '@react-navigation/stack';

export type PortfolioRoutes = {
  forgotPassword: undefined;
  home: undefined;
  landing: undefined;
  login: undefined;
  notFound: undefined;
  settings: undefined;
};

export type PortfolioNavigation = StackNavigationProp<PortfolioRoutes>;
