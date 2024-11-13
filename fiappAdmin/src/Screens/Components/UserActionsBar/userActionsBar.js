import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    paddingTop:20,
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  profileInfo: {
    marginBottom: 20,
  },
  textModal: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonLogOut: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  textBtnLogOut: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;