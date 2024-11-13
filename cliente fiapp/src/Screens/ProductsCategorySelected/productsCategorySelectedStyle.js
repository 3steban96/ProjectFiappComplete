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
      width: '70%',
      flexWrap:'wrap',
      overflow:'hidden',
      height:'auto',
    },
    productTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5
    },
    promotionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap:'wrap',
      overflow:'hidden'
    },
    originalPrice: {
      textDecorationLine: 'line-through', // Aplica el tachado al precio original
      color: 'grey',
      marginRight: 5,
      flexDirection:'row',
      width:'100%'
    },
    promotionPrice: {
      color: 'green', // Cambia el color para destacar el precio de promoción
      fontWeight: 'bold',
    },
    productPrice: {
      color: '#333',
      // marginBottom: 9
    },
    productAdded:{
      position:'absolute',
      top:0,
      right:0,
      padding: 5, // Espacio alrededor del texto para una mejor visualización
      backgroundColor: "#1F8169", // Color de fondo para que resalte
      borderRadius: 5,
      borderTopLeftRadius:0
,      overflow:'hidden',
      flexWrap:'wrap',
      width:'10%',
      alignContent:'center',
      justifyContent:'center',
    },

    addToCartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      width:'auto',
      justifyContent:'space-around',
      flexWrap:'wrap',
      overflow:'hidden',
      height:'auto',
    },
    quantityInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
      marginRight: 10,
      textAlign: 'center',
    },
    buttonAddProduct: {
      backgroundColor: '#28a745',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      // marginRight:20
    },
    textButtonAddProduct: {
      color: '#fff',
      fontWeight: 'bold',
    },
    unitButton: {
      padding: 8,
      marginHorizontal: 4,
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    unitButtonSelected: {
      backgroundColor: '#007bff',
    },
    unitButtonText: {
      color: '#fff',
    },
});

export default styles;