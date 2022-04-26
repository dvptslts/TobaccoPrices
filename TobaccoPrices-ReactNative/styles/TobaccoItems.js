import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: "#b5a379",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginLeft: 3,
      width: 85
    },
    buttonOpen: {
      backgroundColor: "#eb8c34",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });