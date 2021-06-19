import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StackNavigator from './src/components/Navigators/StackNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import Config from "react-native-config";

// Initialize Apollo Client
const client = new ApolloClient({
  link: 
  new HttpLink({
    uri: Config.HASURA_URL
  }),
  cache: new InMemoryCache()
});

export default class App extends Component {  

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <StackNavigator />
        </View>
      </ApolloProvider>
      
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
