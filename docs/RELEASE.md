# Release

## Android

### generate .jks

```sh
cd android/app
keytool -genkeypair -v -keystore debug.jks -alias debug -keyalg RSA -keysize 2048 -validity 10000
keytool -genkeypair -v -keystore release.jks -alias debug -keyalg RSA -keysize 2048 -validity 10000

```

### build .apk

```sh
cd android
./gradlew assembleRelease
./gradlew assembleDebug
```

### build .aab

```sh
cd android
./gradlew bundleRelease
./gradlew bundleDebug
```

## iOS

### archive

```sh
xcodebuild -workspace core.xcworkspace -scheme core -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/app.xcarchive
```

### build .ipa

```sh
xcodebuild -exportArchive -archivePath $PWD/build/core.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/build

```
