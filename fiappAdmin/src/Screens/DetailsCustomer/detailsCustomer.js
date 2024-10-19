import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // position:'relative',
      flex: 1,
      backgroundColor:'#f1f1f1',
      alignItems:'center',
    },
    rowTitleP:{
      paddingTop:5,
      flexDirection:'row',
      marginHorizontal:20
    },
    titleRecordP:{
      width:'100%',
      textAlign:'left',
      fontSize:22,
      fontWeight:'500'
    },

  });
  
  export default styles;