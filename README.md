# Clowdr Mobile app

## Setting up

### Pre-requisite
- Setup react native environment for iOS and Android - [Link](https://reactnative.dev/docs/environment-setup)
- Install Cocoapods - [Link](https://guides.cocoapods.org/using/getting-started.html)
- Auth0 setup - [Link](https://auth0.com/docs/quickstart/native/react-native/00-login)

### Steps for iOS
- Clone this repository
- `npm i`
- `cd ios && pod install && cd ..`
- `npm run ios`

#### Additional Notes for iOS
- Disable `Edit -> Automatically sync Pasteboard` in the simulator. This will cause issues such as locking up the UI thread and making the app non-response. 