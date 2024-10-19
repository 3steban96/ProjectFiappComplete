import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
// container: {
//     flex: 1,
//     backgroundColor:'#f1f1f1',
//     alignItems:'center',
//   },  
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
  rowTitleProduct:{
    flexDirection:'row',
    justifyContent:'center'
  },
  txtProduct:{
    fontSize:19,
    fontWeight:'bold'
  },
  contentDataProduct:{

  },
  rowProduct:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  columnPriceProduct:{
    flex:1,
    flexDirection:'column',
    marginHorizontal:10
  },
  txtPriceProduct:{
    fontSize:17,
    fontWeight:'bold'
  },
  rowButtons:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingTop:20
  }

});
export default styles;