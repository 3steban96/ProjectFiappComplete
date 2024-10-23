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
      // paddingLeft:15,
      width:'100%',
      height:60,
    },
    inputRecordP:{
      // borderWidth:1,
      // borderColor: 'black',
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
    rowContentProducts: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    contentSCProduct: {
      flex: 1,
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: '#ddd',
      padding: 10,
      backgroundColor: 'white'
    },
    productCard: {
      // resizeMode: "stretch",
      // width: width*.9,
      backgroundColor: 'white',
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    productContent: {
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    productImage: {
      width: 70,
      height: 80,
      borderRadius: 5,
      resizeMode: "contain",

    },
    productDetails: {
      width: '50%'
    },
    productTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5
    },
    productPrice: {
      color: '#333',
      marginBottom: 5
    },
    productStock: {
      color: '#7e7e7e'
    },
    productActions: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    actionButton: {
      padding: 10,
      borderRadius: 50
    },
    iconDelete: {
      color: 'red',
      fontSize: 20
    },
    iconEdit: {
      color: '#DFD800',
      fontSize: 20
    },
    supplierContainer: {
      marginHorizontal: 20,
      marginTop: 10
    },
    supplierButton: {
      flexDirection: 'row',
      backgroundColor: '#28a745',
      justifyContent: 'center',
      borderRadius: 5,
      padding: 10,
      marginBottom: 5
    },
    supplierText: {
      fontWeight: 'bold',
      color: 'white',
      marginLeft: 10
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
    },

});

export default styles;