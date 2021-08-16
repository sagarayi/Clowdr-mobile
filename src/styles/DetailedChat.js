import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    footer : {
        flex: 1,
        height: 100
    },
    messages: {
        flex: 1,
        height: "80%"
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        padding:10,
        height:50,
        margin:10,
        width: "80%",
        backgroundColor: '#ffffff',
        borderRadius: 10
    },

    rowContainer: {
        flexDirection: 'row',
        paddingBottom: 30,
        backgroundColor: '#D9D9D9',
    },

    button: {
        backgroundColor: '#58b655',
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        height:50,
        width:50,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    buttonIcon: {
        height: 25,
        width: 25,
        padding:10,
    }
  });

export default styles;