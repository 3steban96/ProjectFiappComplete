import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor:'#f1f1f1',
    alignItems:'center',
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal:20,
    
  },
  modal:{    
    borderRadius:6,
    borderWidth:0.3,
    borderColor:'gray',
    backgroundColor: 'white', 
    padding: 20, 
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 9,
  },
  rowTitleBill:{
    flexDirection:'row',
    justifyContent:'center'
  },
  txtBill:{
    fontSize:19,
    fontWeight:'bold'
  },
  contentDataStore:{

  },
  rowStore:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  columnNameStore:{
    flexDirection:'column'
  },
  columnDateStore:{
    flexDirection:'column'
  },
  txtDataStore:{
    fontSize:17,
    fontWeight:'bold'
  },
  contentDataCustomer:{

  },
  rowCustomer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  columnNameCustomer:{
    flexDirection:'column'
  },
  columnPhoneCustomer:{
    flexDirection:'column'
  },
  txtDataCustomer:{
    fontSize:17,
    fontWeight:'bold'
  },
  rowTitlesTable:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  },
  contentTitle:{
    flexDirection:'column',
    width:'25%',
  },  
  textTitle:{
    // textAlign:'center',
    fontWeight:'bold',
  },
  textTitleAmount:{
    textAlign:'center',
    fontWeight:'bold',
  },
  contentTitleAmount:{
    flexDirection:'column',
    textAlign:'center',
    width:'25%'
  },

  rowContentTotalPrice:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  columnTitleTotalPrice:{},
  txtTitleTotal:{
    fontSize:18,
    fontWeight:'bold'
  },
  columnResultTotalPrice:{},
  txtResultTotalPrice:{
    fontSize:18,
    fontWeight:'bold'
  },
  rowButtons:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingTop:20
  },
  checkBox:{
    paddingHorizontal:20
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: 'green',
  },
});
export default styles;