import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFf',
    // flexDirection:'row'
  },
  containerImg:{
    flex:1,
    flexDirection:'row',
    display:'flex',
    height:'100%',
    justifyContent:'center',
    alignItems:'flex-end',
    paddingBottom:100    
  },
  containerButtons:{
    flex:1,
    justifyContent:'center',
    display:'flex',
    alignContent:'space-between',
    paddingHorizontal:50,
    paddingVertical:20
  },
  containerButton:{

    paddingVertical:10
    // flexDirection:'row',    
  },
  button:{
    borderWidth:1,
    borderColor:'#FFEBEB',
    alignItems:'center',
    backgroundColor:'#FFFF',
    borderRadius:20,
    height:40,
    paddingLeft:10,
    justifyContent:'center',
    shadowColor: 'green',
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 9,
    textAlign:'center'
  }
  
  });
  
  export default styles;