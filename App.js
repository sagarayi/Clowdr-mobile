/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StackNavigator from './src/components/StackNavigator';

import Root from "./src/components/StackNavigator";

export default class App extends Component {  

  render() {
    return (
      <View style={styles.container}>
        <StackNavigator />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
