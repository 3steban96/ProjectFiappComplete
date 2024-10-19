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
  pickerContent: {
    marginHorizontal:20,
    marginVertical:10
  },
  pickerText:{
    fontWeight:'bold',
    fontSize:15
  },
  containerPicker:{
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,

  },
  picker: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    width:width*0.4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },


  containerR: {
    flexDirection: 'row',
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'space-between', // Espacio entre los elementos
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textInputR: {
    flex: 2, 
    marginRight: 10,
    backgroundColor:'#f1f1f1' 
  },
  pickerContainerR: {
    flex: 1, // Controla el espacio ocupado por el Picker
  },
  pickerR: {
    width: '100%',
  },
  });
  
  export default styles;