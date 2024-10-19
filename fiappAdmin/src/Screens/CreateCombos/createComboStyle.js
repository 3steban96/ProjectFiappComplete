import { Dimensions, SafeAreaView ,StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // position:'relative',
      flex: 1,
      backgroundColor:'#f1f1f1',
      alignItems:'center',
      marginBottom:20
      // justifyContent:'space-between'
    },
    rowTitleP:{
      paddingTop:5,
      flexDirection:'row',
      justifyContent:'center'
    },
    titleRecordP:{
      fontSize:28,
      fontWeight:'bold'
    },
    rowTextInput:{
      marginVertical:5,
      justifyContent:'center',
    },
    inputsRecordP:{
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width:'100%',

    },
    inputContainer: {
      width:'100%',
      marginVertical:5
    },
    inputText:{
      fontWeight:'bold',
      fontSize:15
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    dateRowContainer: {
      width:'100%',
      marginVertical:5,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    dateStart:{
      flexDirection:'column',
      width:'50%',
      paddingHorizontal:10

    },
    dateEnd:{
      flexDirection:'column',
      width:'50%',
      paddingHorizontal:10

    },
    dateButton: {
      backgroundColor: 'black', // Cambia este color por el que desees
      padding: 10,
      borderRadius: 5,
      width:'100%'
    },
    dateButtonText: {
      color: '#fff',
      textAlign: 'center',
    },
    scrollViewProducts:{
      position: 'absolute', 
      top: 5,
      backgroundColor: 'white', 
      width: '100%', 
      zIndex: 1, 
      borderRadius: 10,
      height:'auto'
    },
    buttonScrollviewProduct: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#d9d9d9',
    },
    contentRowButtonSCProd: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentColumnButtonSCProd: {
      flex: 1,
    },
    submitButton: {
      backgroundColor: '#6200EE', // Cambia este color por el que desees
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default styles;