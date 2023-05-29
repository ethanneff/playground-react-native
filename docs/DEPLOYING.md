# Deploying

## Certs

from https://github.com/ethanneff/playground-react-native-certs to `/certs`

## Commands

```sh
fastlane
ios|android
deploy
app:core|progress|journal|complete
method:prod|beta|codepush
```

## Usage

Deploy locally. No free CI.

## Examples

```sh
fastlane ios deploy app:core method:beta
```

```sh
fastlane android deploy app:core method:beta
```
