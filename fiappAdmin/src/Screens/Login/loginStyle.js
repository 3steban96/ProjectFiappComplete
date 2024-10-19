import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFF',
    alignItems:'center',
    justifyContent:'space-between'
    // flexDirection:'row'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: width * 0.3,  
    height: height * 0.3, 
  },
  rowTitleLogin:{
    flex:2,
    paddingTop:40,
    flexDirection:'row',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  titleLogin:{
    fontSize:30,
    color:"#065535",
    fontWeight:'bold'    
  },
  containerInputs:{
    flex:3,
    width:'90%',
    // paddingHorizontal:50,
    // height:20,
    backgroundColor:'#1F8169',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    justifyContent:'flex-start',
  },  
  containerRowInputs:{
    // paddingVertical:10,
    marginVertical:10,
    paddingTop:20,
    paddingLeft:40,
    paddingRight:40
  },
  containerInput:{
    // alignItems:'flex-start',
    // backgroundColor:'#FFFF',
    // // borderRadius:20,
    // height:40,
    // width:'100%',
    // paddingLeft:10,
    // justifyContent:'center',
    // borderWidth:1,
    // borderColor:'white',
    // // shadowColor: 'green',
    // // shadowOffset: {
    // //     width: 0,
    // //     height: 6,
    // // },
    // // shadowOpacity: 0.37,
    // // shadowRadius: 7.49,
    // // elevation: 9,
    // textAlign:'center'
  },

  containerRowButtonLogin:{
    alignItems:'center',
    // backgroundColor:'black',
    paddingTop:30
  },
  containerRowButtoSignIn:{
    paddingTop:30,
    // paddingHorizontal:50,
    flexDirection: "row",
    justifyContent:'center',
    
  },
  containerTextButtonSI:{
    flexDirection:'column'
  },
  buttonSignIn:{
    textDecorationLine: 'underline',
    color:'white',
    fontSize:15,
    fontWeight:'bold',
  },

  containerButton:{
    width:width*0.54,
    borderWidth:1,
    borderColor:'#1F8169',    
    backgroundColor:'#FFFF',
    borderRadius:20,
    height:40,
    paddingLeft:10,
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
  },

  });
  
  export default styles;