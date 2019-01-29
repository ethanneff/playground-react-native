import { Config } from "..";

it("contains config", () => {
  expect(Config).toEqual({
    app: {
      name: "example"
    },
    os: {
      android: "android",
      ios: "ios",
      web: "web"
    },
    web: {
      root: "root"
    }
  });
});
