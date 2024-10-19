import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    width:'100%'
  },
  rowButtons:{
    flexDirection:'row',
    display:'flex',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:40
  },
  columnButton:{
    flexDirection:'column'
  },
  buttonAction: {
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: 'gray',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 10.37,
    shadowRadius: 17.49,
    elevation: 9,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    top:'12%',
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
  textModal:{
    fontSize:14,
    fontWeight:'bold',
    color:'gray',
    paddingTop:8,
  },
  buttonLogOut:{
    backgroundColor:'red',
    borderRadius:10,
    padding:10
  },
  textBtnLogOut:{
    color:'white',
    fontWeight:'bold'
  }
});

export default styles;