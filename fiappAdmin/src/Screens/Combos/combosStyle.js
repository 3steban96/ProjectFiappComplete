import { Dimensions, SafeAreaView ,StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#f1f1f1',
      alignItems:'center',
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
    rowContentPromotions: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    contentSCPromotion: {
      flex: 1,
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: '#ddd',
      padding: 10, // espacio interno añadido
      backgroundColor: 'white' // fondo blanco para las cards
    },
    comboCard: {
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
    comboImage: {
      width: '100%',
      height: 160,
    },
    comboContent: {
      padding: 15
    },
    comboTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5
    },
    comboDescription: {
      color: '#7e7e7e',
      marginBottom: 10
    },
    comboArticles: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10
    },
    comboArticlesLabel: {
      fontWeight: 'bold',
      color: '#333'
    },
    comboArticlesText: {
      color: '#333'
    },
    comboNoProducts: {
      color: '#7e7e7e'
    },
    comboPriceContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    comboPriceBox: {
      backgroundColor: '#000',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10
    },
    comboPriceText: {
      color: 'white',
      fontWeight: 'bold'
    },
    btnSelectPromotion:{
      height:'100%',
      flexDirection:'row',
      borderRadius:10,
      borderColor:'black',
      marginHorizontal:10,
      marginTop:10,
      backgroundColor:'white',
    },

    rowBtnAddPromotion:{
      paddingBottom:30,
      flexDirection:'row'
    },
    btnAddPromotion:{
      backgroundColor:'#33BC82',
      padding:10,
      borderRadius:5
    },
    txtBtnAddPromotion:{
      fontWeight:'bold',
      color:'white'
    },
    submitButtonText:{
      fontWeight:'bold',
      color:'white'
    }
});

export default styles;