type ICallback = () => any;

export default {
  isAuthenticated: false,
  authenticate(cb: ICallback) {
    this.isAuthenticated = true;
    setTimeout(cb, 1000);
  },
  signout(cb: ICallback) {
    this.isAuthenticated = false;
    setTimeout(cb, 1000);
  }
};
