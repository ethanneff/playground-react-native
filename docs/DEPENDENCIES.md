# Dependencies

| dependencies                              | reason                            | purpose                |
| :---------------------------------------- | :-------------------------------- | :--------------------- |
| react                                     | everything                        | core                   |
| react-dom                                 | react-native-web                  | core                   |
| react-native                              | ios and android                   | core                   |
| react-native-web                          | desktop                           | core                   |
| react-native-keyboard-aware-scroll-view   | input scrolling on ios            | feature                |
| react-native-vector-icons                 | icons                             | feature                |
| react-native-device-info                  | device stats                      | feature                |
| react-native-version-number               | app stats                         | feature                |
| react-native-firebase                     | database                          | backend                |
| appcenter                                 | deploy cycle                      | backend                |
| appcenter-analytics                       |                                   | analytics              |
| appcenter-crashes                         |                                   | crashes                |
| appcenter-push                            |                                   | push notifications     |
| redux                                     | state                             | state management       |
| react-redux                               | connector                         | state management       |
| redux-thunk                               | async state                       | state management       |
| typesafe-actions                          | reduce action boilerplate         | state management       |
| utility-types                             | nested read only immutability     | state management       |
| uuid                                      | v4 unique ids for all             | state management       |
| reselect                                  | memoization reads                 | state management       |
| @redux-offline/redux-offline              | offline state                     | state management       |
| @commitlint/cli                           | strict commit messages            | continuous integration |
| @commitlint/config-conventional           | strict commit messages angular    | continuous integration |
| @semantic-release/commit-analyzer         |                                   | continuous integration |
| @semantic-release/release-notes-generator |                                   | continuous integration |
| @semantic-release/changelog               | ci auto generate changelog        | continuous integration |
| @semantic-release/git                     | ci commit messages for changelog  | continuous integration |
| @semantic-release/github                  | ci push release to github         | continuous integration |
| semantic-release                          | ci builder                        | continuous integration |
| travis-deploy-once                        | runs ci only once per environment | continuous integration |
| husky                                     | git hooks                         | continuous integration |
| lint-staged                               | git hook for prettier             | continuous integration |
| @types/axios                              |                                   | type definition        |
| @types/jest                               |                                   | type definition        |
| @types/react                              |                                   | type definition        |
| @types/react-native                       |                                   | type definition        |
| @types/react-native-vector-icons          |                                   | type definition        |
| @types/react-native-version-number        |                                   | type definition        |
| @types/react-redux                        |                                   | type definition        |
| @types/react-test-renderer                |                                   | type definition        |
| @types/uuid                               |                                   | type definition        |
| codecov                                   | code coverage                     | code quality           |
| prettier                                  | opinionated code format           | code quality           |
| tslint                                    | type checking lint                | code quality           |
| tslint-config-prettier                    | type with prettier format         | code quality           |
| typescript                                | interface types                   | code quality           |
| npm-check-updates                         | dependency checker                | code quality           |
| jest                                      | react testing framework           | testing                |
| react-test-renderer                       | test components                   | testing                |
| babel-jest                                | prevents errors with jest         | testing                |
| ts-jest                                   | typescript tests                  | testing                |
| react-art                                 | react-native-web (remove?)        | other                  |
| moment                                    | time                              | other                  |
| axios                                     | async networking                  | networking             |

# Not Installed Dependencies

| dependencies                 | purpose                  | reason         |
| :--------------------------- | :----------------------- | :------------- |
| react-native-reanimated      | no js thread animations  | no web support |
| react-native-gesture-handler | no js thread transitions | no web support |
