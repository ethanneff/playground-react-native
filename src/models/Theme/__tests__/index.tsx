import { getType } from "typesafe-actions";
import { changeTheme, ColorTheme, themeInitialState, themeReducer } from "..";
import { logout } from "../../Auth";

describe("reducer", () => {
  it("changeTheme", () => {
    const payload = ColorTheme.Dark;
    expect(
      themeReducer(themeInitialState, {
        payload,
        type: getType(changeTheme)
      })
    ).toMatchObject({ currentColor: payload });
  });
  it("logout", () => {
    expect(
      themeReducer(themeInitialState, {
        type: getType(logout)
      })
    ).toMatchObject(themeInitialState);
  });
});
