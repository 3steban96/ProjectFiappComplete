import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
container: {
  position:'relative',
    flex: 1,
    backgroundColor:'#f1f1f1',
    alignItems:'center',
    // justifyContent:'space-between'
  },
  rowTileRP:{
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
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    
    height:60,
    flexDirection:'row'
  },
  inputSearchCustomer:{
    // borderWidth:0.2,
    width:'auto',
    flexDirection:'column',
    // borderColor:'black',
    backgroundColor:'white',
    width:'75%',
    // borderWidth:1,
    borderRadius:18,
    // height:'100%',
    // width:'80%',
    paddingLeft:20,
    paddingVertical:10,
    // borderWidth: 0.2,
    // backgroundColor:'white',
    // borderColor: 'black',
    // shadowColor: 'gray',
    // shadowOffset: {
    //   width: 0,
    //   height:1,
    // },
    // shadowOpacity: 1.37,
    // shadowRadius: 17.49,
    // elevation: 19,
  },
  inputsRecordP:{
    // borderWidth:1,
    borderRadius:18,
    height:'100%',
    width:'100%',
    paddingLeft:20,
    paddingVertical:10,
    // borderWidth: 0.2,
    backgroundColor:'white',
    borderColor: 'black',
    // shadowColor: 'gray',
    // shadowOffset: {
    //   width: 0,
    //   height:1,
    // },
    // shadowOpacity: 1.37,
    // shadowRadius: 17.49,
    // elevation: 19,
  },
  scrollViewCustomers:{
    position:'absolute',
    top: 5,
    backgroundColor: 'white',
    width: '80%',
    zIndex: 1,
    borderRadius: 5,
    height:'auto',
    paddingHorizontal:10,
    marginHorizontal:20,
  },
  buttonScrollviewCustomer:{
    paddingVertical:15,
    
  },
  scrollViewProducts:{
    // flex:1,
    position: 'absolute', 
    top: 5,
    backgroundColor: 'white', 
    width: '80%', 
    zIndex: 1, 
    borderRadius: 10,
    height:'auto',
    paddingHorizontal:10,
    marginHorizontal:20,
  },
  buttonScrollviewProduct:{
    paddingVertical: 15,
  },
  contentRowButtonSCProd:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  contentColumnButtonSCProd:{
    flexDirection:'column'
  },
  rowCheckBox:{
    flexDirection:'row',
    paddingTop:10,
    paddingHorizontal:20,
    width:'100%'
  },
  textCheckBox:{
    fontSize: 16,
    fontWeight:'bold'
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
  rowContentTitleBill:{
    flexDirection:'row',
    paddingTop:5,
    zIndex:0 
  },
  rowTitleBill:{
    fontSize:18,
    fontWeight:'bold'
  },
  rowContentBill:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    paddingHorizontal:20,
    paddingTop:10,
    paddingBottom:10,
    
  },
  contentBill:{
    flex:1,
    // borderWidth:0.2,
    borderRadius:10,
    backgroundColor:'white'
  },
  rowsTitleCustomerBill:{
    paddingHorizontal:10,
  },
  rowCustomer:{
    flexDirection:'row',
    width:'100%'
  },
  customerName:{
    fontWeight:'bold',
    paddingVertical:5
  },
  rowTitlesTable:{
    flexDirection:'row',
    width:'100%',
    paddingLeft:10
  },
  contentTitle:{
    flex:1,
    flexDirection:'column',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  textTitle:{
    fontWeight:'bold',
    paddingVertical:0
  },
  rowContentTotalPrice:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    zIndex:1
  },
  columnTitleTotalPrice:{
    flexDirection:'column',
    width:'50%'
  },
  txtTitleTotal:{
    textAlign:'right',
    fontWeight:'bold'
  },
  columnResultTotalPrice:{
    flexDirection:'column',
    width:'50%',
    zIndex:1
  },
  txtResultTotalPrice:{
    fontWeight:'bold',
    textAlign:'right'
  },
  rowButtonSaveBuy:{
    paddingBottom:30,
    flexDirection:'row'
  },
  buttonSaveBuy:{
    backgroundColor:'#33BC82',
    padding:10,
    borderRadius:5
  },
  txtButtonSaveBuy:{
    fontWeight:'bold',
    color:'white'
  }

});
export default styles;