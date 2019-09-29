import { navigate } from "./../../models/Navigation/index";
import { useRootDispatch } from "../../utils";
import { NavigationScreen } from "../../models";

export const useNav = () => {
  const dispatch = useRootDispatch();
  const to = (to: NavigationScreen) => () => dispatch(navigate(to));
  return { to };
};
