<div align="center">
  <h1>example</h1>
  <a href="https://david-dm.org/ethanneff/example">
    <img src="https://david-dm.org/ethanneff/example.svg" alt="Dependency Status" />
  </a>
  <a href="https://david-dm.org/ethanneff/example#info=devDependencies">
    <img src="https://david-dm.org/ethanneff/example/dev-status.svg" alt="DevDependency Status" />
  </a>
  <a href="https://travis-ci.org/ethanneff/example">
    <img src="https://travis-ci.org/ethanneff/example.svg" alt="Build Status" />
  </a>
  <a href="https://ethanneff.github.io/example/">
    <img src="https://img.shields.io/website/https/ethanneff.github.io/example.svg" alt="Website Status" />
  </a>  
  <a href="https://codecov.io/gh/ethanneff/example">
    <img src="https://codecov.io/gh/ethanneff/example/branch/master/graph/badge.svg" alt="Test Coverage" />
  </a>
  <a href="https://github.com/ethanneff/example">
    <img src="https://img.shields.io/github/release/ethanneff/example.svg" alt="Github Release" />
  </a>
  <a href="https://github.com/ethanneff/example/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Github License" />
  </a>
</div>

## Install

```sh
npm i -g yarn
git clone git@github.com:ethanneff/react-native-web-typescript.git
cd react-native-typescript
yarn install
```

#### Run

```sh
yarn ios
```

```sh
yarn android
```

```sh
yarn web
```

#### Lint

```sh
yarn lint
```

#### Test

```sh
yarn test
```

#### Deploy

```sh
yarn build
```

## Todo

#### top 1

- [ ] add button colors

#### top 3

- [ ] get a working deploy to android/ios
- [ ] app center ios
- [ ] clean up all todos
- [ ] prevent `Trace: The node type SpreadProperty has been renamed to SpreadElement` in app center build

#### top 5

- [ ] firebase [todo](https://blog.invertase.io/getting-started-with-cloud-firestore-on-react-native-b338fb6525b9)
- [ ] firebase web
- [ ] firebase pass tests
- [ ] firebase android
- [ ] firebase login
- [ ] firebase search
- [ ] firebase comments

#### Rest

- [ ] push notifications to firebase and app center
- [ ] make nav buttons larger
- [ ] okr branch
- [ ] firebase-todo branch
- [ ] clean all branches
- [ ] attempt to replace react-scripts-ts with react-scripts without breaking ci or app center ci
- [ ] clean up user redux
- [ ] add transitions react-router-native-stack
- [ ] add swipe
- [ ] clean up debug index screen
- [ ] figure out auto import relative pathing
- [ ] add locales
- [ ] remove react-scripts-ts without breaking yarn lint
- [ ] re-enable prepush? maybe?
- [ ] create a root initial state for redux tests
- [ ] add error boundary in app and show error alert

#### Done

- [x] add ios push notifications config
- [x] successful ios archive
- [x] go though all dependencies and move them to contributing
- [x] push ios bundle to itunes
- [x] add icons and splash screens
- [x] increase coverage threshold and add coverall pr report
- [x] fix github ci
- [x] prevent travis from running 2 builds on pr
- [x] rename android to com.eneff.example
- [x] update create-react-app v2 (waiting on template PR)
- [x] add app center
- [x] add firebase native
- [x] figure out mock store
- [x] add tests to all files
- [x] upgrade to react native 0.57
- [x] add explosion to debug
- [x] confirm timestamp from done list
- [x] test debugger
- [x] add debug drag ball
- [x] add precommit commitmsg
- [x] clean up router to use classes, nest auth, next route
- [x] create debug screen with everything
- [x] add text sizing
- [x] keyboard dismiss prevents horizontal scroll
- [x] keyboard avoid prevents flex
- [x] add keyboard dismiss
- [x] add slide
- [x] test deinit nav
- [x] add icon native dependencies

## Troubleshoot

- slow Animate.View
  - turn off `Debug JS Remotely`
- `Could not connect to the development server`
  - kill all terminals, kill all simulators, re-run `yarn ios` or `yarn android`
- `Failed to resolve: support-v4`
  - `api "com.android.support:support-v4:$supportVersion"` -> `implementation "com.android.support:support-v4:+"`
- `updating the version of com.google.android.gms to 11.4.2.`
  - move `apply plugin: 'com.google.gms.google-services'` to the bottom of `app/build.gradle`
- `The development server returned a response of 500`
  - run `yarn start` and `yarn android`
- `error: failed to push some refs to 'git@bitbucket.org:hingeinc/phoenix.git'`
  - run `git push` within the terminal
- `error /Users/<USER>/hinge-health/phoenix/node_modules/react-native-ble-plx: Command failed.`
  - run `brew install carthage; gem install cocoapods; cd ios; pod install; cd ..; yarn ios;`
- `Cannot add a child that doesn't have a YogaNode`
  - Make sure your `jsx` is properly formatted (no spaces or characters outside a JSX element)
- `Unknown named module`
  - kill everything, run `yarn start`. typically happens after adding a new npm/module
- running from `pre-bundled build`
  - make sure device is on the same network as computer and restart metro bundler
- android simulator crashing
  - screens with `react-native-video` will not work with android simulator, use a device
- `com.android.ddmlib.InstallException: INSTALL_FAILED_UPDATE_INCOMPATIBLE`
  - delete and reinstall the app using `yarn android`
- seeing 1000x of linting errors
  - pull down the latest `package.json` and `yarn.lock` from master and run `yarn install`
- images are still fuzzy/blurry
  - run `yarn reset` and make sure you are using `example.png` `example@2x.png` `example@3x.png`
- `__DEV__` not working
  - `__DEV__` only works if you are on a simulator (or amazon tablet). It has nothing to do with development or production builds.
- `componentWillUnmount()` not being called
  - When navigating within a stack, `componentWillUnmount()` will NOT be called. Only when you exit from one stack to another will it be called.
