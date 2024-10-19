import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1F8169',
  },
  rowTitle: {
    marginHorizontal: 20,
    alignItems: 'flex-start',
    marginTop: 20,
    flex:.4,
    justifyContent:'center'
  },
  txtTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'white'
  },
  rowTitle2: {
    marginHorizontal: 20,
    alignItems: 'flex-start',
    marginTop: 20,
    flex:.4,
    justifyContent:'center'
  },
  txtTitle2: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'white',
    paddingLeft:40
  },
  inputContainer: {
    marginHorizontal:20,
    marginVertical:10
  },
  inputText:{
    fontWeight:'bold',
    fontSize:15
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    marginHorizontal:20,
    marginVertical:10,
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
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  });
  
  export default styles;