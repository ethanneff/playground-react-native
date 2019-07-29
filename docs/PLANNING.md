# Planning

- apps
  - hourly update
  - checklist
  - todo
  - cant hurt me
  - portfolio
- features
  - debug menu
  - questionnaires
  - dark mode
  - chat
  - markdown
- architecture
  - navigation
  - firebase
  - commented code
  - tests
- integration
  - ios deploy
  - android deploy

## Top 1

#### working android app

- [ ] hourly update
  - [ ] scroll to day
  - [ ] focus day
- [ ] firebase
- [ ] app center deploy
- [ ] logins/signups
- [ ] [design chat datamodels](https://www.youtube.com/watch?v=m_u6P5k0vP0&feature=share)

## Top 3

#### code cleanup

- [ ] remove all commented code
  - [ ] swipe
  - [ ] slack
  - [ ] yellowbox warnings
  - [ ] dialog tests
  - [ ] test warnings
  - [ ] web warnings
  - [ ] remove momentjs
- [ ] dark mode

#### best practices and scalability

- [ ] offline reset (error boundary)
- [x] nested navigation
- [ ] test hooks
- [ ] mock date, fix tests, fix releases
- [ ] test redux offline

#### landing page

- [ ] main landing page https://www.lemonade.com/ https://www.any.do/ https://i.imgur.com/e4svRwy.png https://evernote.com/ https://telegram.org/ https://lyft.com http://www.shegy.nazwa.pl/materialupmarket/mdlp/index_light.html https://ifttt.com/
- [ ] icons for web
- [ ] each app landing page

## Top 5

##### payment feature

- [ ] payment dialog
- [ ] google admob
- [ ] facebook ads

##### questionnaire feature

- [ ] nps
- [ ] feedback

##### checklists

- [ ] checklist mvp with navigation
- [ ] use evernote to make example data structure of checklist and actionables
- [ ] checklist async tests

##### chat

##### gamification

- [ ] [badges](https://www.youtube.com/watch?v=4-s1qoADXok)
- [ ] [points](https://www.youtube.com/watch?v=i-08jn0VP-A) (total points like teamtreehouse without levels) (khanacadamey, codeacadamey)
- [ ] leader boards
- [ ] spend points (gifts, subscription)

## Rest

#### v4 proof of concept

- [ ] firebase
  - [ ] firebase native
  - [ ] firebase [todo](https://blog.invertase.io/getting-started-with-cloud-firestore-on-react-native-b338fb6525b9)
  - [ ] firebase android
  - [ ] firebase login
  - [ ] firebase search
  - [ ] firebase comments
  - [ ] firebase web
  - [ ] firebase pass tests
  - [ ] firebase-todo branch
- [ ] codepush
- [ ] app center
- [ ] release

#### v5 revenue

#### v6 dx

- [x] ~~airbnb lint~~
- [x] prettier lint
- [x] github ci
- [x] deploy ci
- [x] jest
- [x] codecov
- [x] dependency check
- [x] change log
- [x] commit restriction
- [ ] dependency auto update

#### v7 apps

- [ ] splitwise
- [ ] timer
- [ ] weekly games

#### v8 components

- [x] textinput
- [ ] radio
- [ ] selection
- [ ] swipe

#### v9 cleanup

- [ ] add error boundary in app and show error alert
- [ ] remove `@babel/plugin-transform-object-assign` dependency when updating `react` `react-dom` or `react-test-renderer`
- [ ] remove `YellowBox` warning after upgrading react native to 0.59.5+
- [ ] prevent `Trace: The node type SpreadProperty has been renamed to SpreadElement` in app center build

#### v10 other

- [ ] webpack DLL plugin
- [ ] checklist tests
- [ ] push notifications to firebase and app center
- [ ] add transitions react-router-native-stack
- [ ] add locales
- [ ] re-enable prepush?
- [ ] get a working deploy to android/ios
- [ ] set metro.config to `true` without crashing because of `react-native-vector-icons`w

#### v9 best practices

- [ ] memo and usecallback everything
- [ ] react-native-responsive
- [x] ~~relay~~
- [x] ~~[styled components](https://github.com/styled-components/styled-components)~~
- [x] vscode (editor)
- [x] remote-redux-devtools
- [x] [typescript](https://medium.com/@rintoj/react-native-with-typescript-40355a90a5d7) (type checking)
- [ ] [sentry](https://github.com/getsentry/react-native-sentry) (stack traces)
- [ ] [onesignal](https://github.com/geektimecoil/react-native-onesignal) (notifications)
- [ ] [snoopy](https://github.com/jondot/rn-snoopy) (profiling)
- [x] ~~[storybook](https://github.com/storybooks/storybook/tree/master/app/react-native) (component builder)~~
- [x] [duck or duck++](https://github.com/erikras/ducks-modular-redux) (redux management)
- [x] ~~[react-native-interactable](https://github.com/wix/react-native-interactable) (native animations)~~
- [x] ~~[redux injectors](http://nicolasgallagher.com/redux-modules-and-code-splitting/)~~

## Done

- [x] main tableview
- [x] main navigation
- [x] main counter
- [x] main app statusbar
- [x] fix stopwatch
- [x] logout clear everything
- [x] attempt icons again
- [x] useRootSelector
- [x] darkmode
- [x] fix test because of hooks
- [x] useRootDispatch
- [x] finish redux for user (async typeactions)
- [x] hook up auth to sign in flow
- [x] add tests to auth
- [x] clean up navigation layer
- [x] fix checklists and canthurtme
- [x] push v2 fix
- [x] move all code to /app
- [x] move modals to /screen
- [x] remove modal1 and modal2
- [x] get ci working again
- [x] create a root initial state for redux tests
- [x] figure out auto import relative pathing
- [x] clean up debug index screen
- [x] add keyboard listener to device
- [x] convert other reduxes to new syntax
- [x] fix web for device-info and version-number
- [x] complete device tests for 100% test coverage
- [x] checklist redux
- [x] clean all branches
- [x] clean up all todos
- [x] remove react-scripts-ts without breaking yarn lint
- [x] attempt to replace react-scripts-ts with react-scripts without breaking ci or app center ci
- [x] update to react native 0.59
- [x] infinite scroll image collection
- [x] fix broken ci
- [x] look into [react navigation for web](https://github.com/react-navigation/example-web)
- [x] update to react native 58
- [x] validate commit messages work
- [x] make redux clean
- [x] update dependencies with new redux tools
- [x] figure out why not releasing
- [x] get semantic release and changelog working
- [x] make nav buttons larger
- [x] button icon color
- [x] pull in button and text update
- [x] remove icon && <Component>
- [x] add button colors
- [x] figure out release
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
