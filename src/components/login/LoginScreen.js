import React from 'react';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import {
    StyleSheet,
    Button,
    Text, View,TouchableOpacity
  } from 'react-native';
import AppButton from '../common/AppButton';
import Auth0 from 'react-native-auth0';


const auth0 = new Auth0({ domain: 'dev-jjrbfhx5.us.auth0.com', clientId: 'CdIkhbvmgD4KlQgWmSyqiemdQAbOiP6Z' });
const  LoginScreen = () => { 
    return (<View>
            <Text>
                Login Screen
            </Text>
            <AppButton title='Login' onPress={loginButtonPressed}/>
            <AppButton title='SignUp' onPress={signUpButtonPressed}/>
        </View>)
}

function loginButtonPressed() {
    auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .then(credentials =>
      // Successfully authenticated
      // Store the accessToken
      {console.log(credentials)
        console.log(credentials.accessToken)
        this.setState({ accessToken: credentials.accessToken })}
      
    )
    .catch(error => console.log(error));

}
function signUpButtonPressed() {
    alert("SignUp Pressed")
}

    



export default LoginScreen;