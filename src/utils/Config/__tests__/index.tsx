import { Config } from "..";

it("contains config", () => {
  expect(Config).toEqual({
    app: {
      name: "example"
    },
    os: {
      ios: "ios",
      android: "android",
      web: "web"
    },
    web: {
      root: "root"
    }
  });
});
