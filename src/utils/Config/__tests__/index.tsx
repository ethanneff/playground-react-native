import { Config } from "..";

it("contains config", () => {
  expect(Config).toEqual({
    app: {
      name: "example",
      timeout: 5000
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
