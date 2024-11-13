import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para enfocar el modal
    },
    modal: {    
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: '#ccc',
      backgroundColor: 'white', 
      padding: 20, 
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10,
      maxHeight: '80%',
    },
    rowTitleBill: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 10,
    },
    txtBill: {
      fontSize: 20,
      fontWeight: '700',
      color: '#333',
    },
    rowTitlesTable: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    contentTitle: {
      width: '20%',
      alignItems: 'center',
    },
    textTitle: {
      fontWeight: '600',
      fontSize: 14,
      color: '#444',
    },
    textTitleAmount: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 14,
      color: '#444',
    },
    contentTitleAmount: {
      width: '20%',
      alignItems: 'center',
    },
  })

export default styles;