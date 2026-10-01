# Upscayl Android

This directory contains the Android mobile app packaging for Upscayl.

## What is included

- Capacitor 7 Android runtime
- Mobile web UI in `www/`
- Android project generation via Capacitor
- Debug APK build through Gradle
- GitHub Actions workflow that publishes the APK as a build artifact

## Local build

Requirements:

- Node.js 20+
- Android Studio / Android SDK
- Android SDK Platform and Build Tools installed
- Java 17

From this directory:

```bash
npm install
npm run android:add
npm run android:sync
npm run android:build
```

The debug APK is produced at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

You can also open the generated project in Android Studio:

```bash
npm run android:open
```

## GitHub Actions

Pushes to `main` or `android-apk` run the Android build workflow. The generated `app-debug.apk` is uploaded as the `upscayl-debug-apk` artifact.

The generated `android/` directory is intentionally ignored by Git because Capacitor recreates it from the mobile package configuration.

## Processing engine

The mobile build uses the Upscayl Cloud API. The desktop NCNN/Vulkan binaries are not Android binaries and are therefore not bundled into this APK. An Upscayl Cloud API key and network connection are required for image processing.
