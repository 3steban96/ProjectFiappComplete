import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Color más suave de fondo
    alignItems: 'center',
    paddingTop: 20, // Espaciado superior
  },
  SafeAreaView:{
    flex: 1,
  },
  rowTitleP: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleRecordP: {
    fontSize: 26, // Tamaño ligeramente reducido para mejor proporción
    fontWeight: 'bold',
    color: '#333', // Color más suave y profesional
  },
  rowTextInput: {
    paddingTop: 20,
    paddingHorizontal: 20, // Ajustado para mayor coherencia
    width: '90%',
    height: 60,
  },
  inputRecordP: {
    borderWidth: 1,
    borderRadius: 10, // Bordes más redondeados
    height: '100%',
    paddingLeft: 15, // Ajuste para coherencia
    paddingVertical: 10,
    backgroundColor: 'white',
    borderColor: '#ddd', // Color más claro para el borde
    shadowColor: '#aaa', // Sombra más sutil
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Menos opacidad para una sombra más ligera
    shadowRadius: 8,
    elevation: 4, // Elevación más baja para una sombra más suave
  },
  rowContentProducts: {
    flex:1,
    height:'100%',
    flexDirection: 'row',
    paddingHorizontal: 15, // Padding ajustado
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor:'red'
  },
  contentSCProduct: {
    backgroundColor: '#fff', // Fondo blanco limpio para los productos
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd', // Borde suave
    padding: 10, // Espaciado interno para contenido
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra ligera
  },
  btnSelectProduct: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', // Mejor alineación entre productos
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9', // Fondo suave para el botón
    borderRadius: 8,
    marginBottom: 10,
  },
  rowBtnAddProduct: {
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center', // Centrar botón de añadir producto
  },
  btnAddProduct: {
    backgroundColor: '#33BC82', // Color verde más vibrante
    padding: 12,
    borderRadius: 8, // Bordes más suaves
    shadowColor: '#33BC82', // Sombra del mismo color para coherencia
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  txtBtnAddProduct: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Centrar texto dentro del botón
  },
});

export default styles;
