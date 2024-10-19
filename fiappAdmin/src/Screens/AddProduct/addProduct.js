import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFf',
  },
  rowTitle: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  rowTitle2: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginHorizontal:20,
    marginVertical:5
  },
  inputText:{
    fontWeight:'bold',
    fontSize:15
  },
  picker:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10
  },
  pickerUnitType:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height:55
  },
  inputAmount: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:'100%',
    height:55
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
  scrollViewProducts: {
    position: 'absolute', 
    top: 45, // Ajusta esto según la posición del input
    backgroundColor: 'white', 
    width: '100%', 
    zIndex: 1, 
    borderRadius: 10,
    maxHeight: 150, // Establece una altura máxima para el scroll
  },
  buttonScrollviewProduct: {
    paddingVertical: 15,
    paddingHorizontal: 10, // Añadir padding horizontal para mejor separación
    borderBottomWidth: 1, // Añadir una línea divisoria entre elementos
    borderBottomColor: '#ccc', // Color de la línea divisoria
  },
  contentColumnButtonSCProd: {
    flexDirection: 'column',
    color: 'black',
    justifyContent: 'center',
  },
  });
  
  export default styles;