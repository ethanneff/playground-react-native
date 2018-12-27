# Contributing

## Install

- install debugger

  ```sh
  brew update && brew cask install react-native-debugger
  ```

- pull in [firebase configs](https://console.firebase.google.com/project/example-d79fd/settings/general/android:com.eneff.example)

## Coding Best Practices

1. Focus on readability. The ratio of time spent reading code versus writing is over 10 to 1.
2. Take responsibility. You are responsible for the quality of your code.
3. Use meaningful names. Clean code should read like a well-written prose.
4. Write code that expresses intent. Comments are often lies waiting to happen.
5. Leave the code better than you found it.
6. Use the single responsibility principle. A method does one thing, does it well, does it only.
7. Write tests.
8. Work in short cycles. Incremental and iterative.
9. Use independent architecture. Code should work outside of frameworks.
10. Practice, practice, practice.

## Reviewing Pull Requests

#### Required

- prevent merge conflict
- prevent failed CI
- prevent any `//` code that has been commented out
- prevent any `TODO` or `FIXME` comments (should be a JIRA and referenced in the PR)
- prevent any `tslint:` ignores
- prevent arrow functions in props `<Button onClick={() => this.handleClick()} />` [why](https://reactjs.org/docs/faq-functions.html#is-it-ok-to-use-arrow-functions-in-render-methods)
- prevent any unsafe methods `componentWillReceiveProps`, `componentWillUpdate`, `componentWillMount` [why](https://reactjs.org/docs/react-component.html#unsafe_componentwillmount)
- prevent any inline `"strings"` (everyone should import from `locales`)
- all components/containers need to have at least one `snapshot`
- question any dependency update to `package.json` (if need, if supported, etc)

#### Recommended

- always use `PureComponent`
- styling sizing must be divisible by `4` and not `10` [why](https://material.io/design/layout/spacing-methods.html#)
- large arrays renderings should use `FlatList` [why](https://facebook.github.io/react-native/docs/flatlist)
- use fragments `<></>` instead of `<View></View>` if the view does not use any properties [why](https://reactjs.org/docs/fragments.html)
- any changes to `/commons/Analytics/config.tsx` need PM approval (will effect downstream analytics)
- any renaming of screen containers needs PM approval (will effect downstream analytics)
- pull in Ethan for any changes to `/ios` or `/android`
- prevent any inline `#fafafa` colors (use `Theme.color` instead)
- prevent any `_` underscore named variables
- all redux actions must be past tense
- all comments must be present tense
- routinely update this checklist

## Other

#### Icon generation

- no transparency
- https://www.flaticon.com/
- https://apetools.webprofusion.com/app/#/tools/imagegorilla
- https://designer.gravit.io/
