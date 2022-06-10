# Deploying

## Env vars

```sh
export ANDROID_KEYSTORE_PASSWORD=''
export ANDROID_KEY_ALIAS=''
export ANDROID_KEY_PASSWORD=''
export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=''
export GIT_AUTH=''
```

## Certs

from https://github.com/ethanneff/playground-react-native-certs to `/certs`

## Commands

```sh
fastlane
ios|android
deploy
app:core|progress|journal|complete
method:prod|test|codepush
```

## Usage

Deploy locally. No free CI.

## Examples

```sh
fastlane ios deploy app:core method:prod
```

```sh
fastlane android deploy app:core method:prod
```
