import { Dimensions, SafeAreaView ,StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // position:'relative',
      flex: 1,
      backgroundColor:'#f1f1f1',
      alignItems:'center',
      // justifyContent:'space-between'
    },
    rowTitleP: {
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    titleRecordP: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 15,
    },
    inputText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      color: '#444',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#fff',
    },
    dateRowContainer: {
      width: '100%',
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateStart: {
      flexDirection: 'column',
      width: '48%',
    },
    dateEnd: {
      flexDirection: 'column',
      width: '48%',
    },
    dateButton: {
      backgroundColor: '#6200EE',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    dateButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    scrollViewProducts: {
      maxHeight: 150,
      borderColor: '#d9d9d9',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#f9f9f9',
      marginTop: 10,
    },
    buttonScrollviewProduct: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    contentRowButtonSCProd: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentColumnButtonSCProd: {
      flex: 1,
    },
    submitButton: {
      backgroundColor: '#03A9F4',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    scrollView: {
      width: '100%',
      paddingVertical: 10,
    },
});

export default styles;