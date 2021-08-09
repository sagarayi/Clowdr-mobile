import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity
  } from 'react-native';

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#58b655",
      borderRadius: 5,
      marginLeft:50,
      marginRight: 50,
      marginTop: 50,
      alignContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });

export default AppButton;