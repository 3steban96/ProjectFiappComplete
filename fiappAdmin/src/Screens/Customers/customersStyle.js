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
    rowTitleP:{
      paddingTop:5,
      flexDirection:'row'
    },
    titleRecordP:{
      fontSize:28,
      fontWeight:'bold'
    },
    rowTextInput:{
      paddingTop:20,
      paddingHorizontal:20,
      width:'100%',
      height:60,
    },
    inputRecordP:{
      borderRadius:18,
      height:'100%',
      paddingLeft:20,
      paddingVertical:10,
      backgroundColor:'white',      
      shadowColor: 'gray',
      shadowOffset: {
        width: 0,
        height:1,
      },
      shadowOpacity: 1.37,
      shadowRadius: 17.49,
      elevation: 19,
    },
    rowContentCustomers: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    contentSCCustomer: {
      flex: 1,
      borderRadius: 10,
      padding: 10,
      backgroundColor:'white'
    },
    btnSelectCustomer: {
      padding: 15,
      borderRadius: 10, // Aplicamos borderRadius a todas las esquinas
      backgroundColor:'white',
      marginVertical: 10, // Espacio vertical entre las tarjetas
      marginHorizontal: 5,
    },
    containerCard: {
      flexDirection: 'row',
      alignItems: 'center', // Alinea verticalmente el avatar y el texto
    },
    textContainer: {
      flex: 1,
      marginLeft: 15,
      marginBottom:5
    },
    label: {
      fontWeight: 'bold',
      fontSize: 14, 
    },
    labelI: {
      fontWeight: '200',
      fontSize: 14, 
    },
    rowBtnAddProduct:{
      paddingBottom:30,
      flexDirection:'row'
    },
    btnAddProduct:{
      backgroundColor:'#33BC82',
      padding:10,
      borderRadius:5
    },
    txtBtnAddProduct:{
      fontWeight:'bold',
      color:'white'
    }
});

export default styles;