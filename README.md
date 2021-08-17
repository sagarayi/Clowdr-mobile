# Clowdr Mobile app

## Base project
[Clowdr](https://github.com/Clowdr-app/clowdr)

## Setting up

### Pre-requisite
- Setup react native environment for iOS and Android - [Link](https://reactnative.dev/docs/environment-setup)
- Install Cocoapods - [Link](https://guides.cocoapods.org/using/getting-started.html)
- Auth0 setup - [Link](https://auth0.com/docs/quickstart/native/react-native/00-login)
- Backend setup same as the main project - [Link](https://github.com/Clowdr-app/clowdr)

### Steps for iOS
- Clone this repository
- `npm i`
- `cd ios && pod install && cd ..`
- `npm run ios`

#### Additional Notes for iOS
- Disable `Edit -> Automatically sync Pasteboard` in the simulator. This will cause issues such as locking up the UI thread and making the app non-response. 

### Environment variables
There are few environment variables that need to be set inorder for the app to fetch and store data. They are specified in the .env file.
| Variable       | Description  | Example value |
| ----------- | ----------- | ----------- | 
| AUTH0_DOMAIN      | Domain of your Auth0 app      | dev-jjrbfhx5.us.auth0.com |
| AUTH0_CLIENT_ID   | Client ID associated with the Auth0 app        | `CdIkhbvmgD4KlQgWmSyqiemdQAbOiP6Z` |
|HASURA_URL| Public facing Hasura URL| https://rnauth.ngrok.io/v1/graphql|
|WEBSOCKET_SERVER_URL| Public facing Websocket URL| https://rnwebsocket.ngrok.io|