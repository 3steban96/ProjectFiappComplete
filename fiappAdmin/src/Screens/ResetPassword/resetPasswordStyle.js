import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  logo: {
    width: width * 0.3,
    height: height * 0.3,
    marginTop: 40,
  },
  backgroundShape: {
    flexDirection: 'row',
    backgroundColor: '#1f8169',
    height: '100%',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    position: 'absolute',
    bottom: 0,
  },
  card: {
    position: 'absolute',
    marginHorizontal: 20,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  containerRowInputs: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius:20,
    borderWidth:1,
    paddingHorizontal:10,
    borderColor:'#1F8169'
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1F8169',
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
