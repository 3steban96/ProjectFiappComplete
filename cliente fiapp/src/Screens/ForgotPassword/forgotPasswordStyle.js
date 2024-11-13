import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({

  logoContainer: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position:'absolute',
    height:'100%',
    width:'100%',
  },
  logo: {
    width: width * 0.3,  
    height: height * 0.3, 
  },


  });
  
  export default styles;