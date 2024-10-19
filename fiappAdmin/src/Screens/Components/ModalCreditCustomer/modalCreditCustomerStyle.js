import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
  },
  modal: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#33BC82',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

});

export default styles;