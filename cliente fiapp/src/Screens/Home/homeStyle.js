import { Dimensions, SafeAreaView ,StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    
  },
  styleCompUserAB:{
    flexDirection:'row'
  },
  rowContentProducts: {
    paddingHorizontal: 20,
    // paddingTop: 20,
    flex:100,
    // marginTop:20,
  },
  rowTitle: {
    paddingVertical: 10,
  },
  txtTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  nameStore: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  rowBttnsCategoryFood: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  bttnCategoryFood: {
    flexDirection:'row', 
    backgroundColor:'#1F8169', 
    height:height*.1, 
    borderRadius:10,
    paddingLeft:10,
    marginVertical:10, 
    alignItems:'center',
    paddingRight:5,
    width:'48%',
    overflow: 'hidden'
  },
  txtBtnCategory:{
    flex: 1, 
    flexWrap: 'wrap',
    color:'#fff',
    fontWeight:'bold'
  },
  iconBtnCategory:{
    height:40, width:35
  },
    contentCardCombo: {
    // flex:1,
    padding: 20,
    width: width * 0.99,
    position: "relative",
    borderWidth: 0.5,
    borderColor: "#bebebe",
    borderRadius: 20,
    backgroundColor: "#e7e7e7",
    height:'100%'
  },
  rowImgPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    width: "100%",
  },
  columnImgPrice: {
    flexDirection: "column",
  },
  imgCombo: {
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 20,
    backgroundColor: "white",
    resizeMode: 'cover',

  },
  contentTxtPrice: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  rowTxtPrice: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  txtComboPrice: {
    textAlign: "right",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  contentRowTxtCombo: {
    position: "absolute",
    top: 0,
    width: "100%",
    left: 0,
  },
  rowTxtCombo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  txtCombo: {
    textAlign: "right",
    padding: 5,
    fontWeight: "bold",
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  txtTitleCombo: {
    paddingTop: 10,
    fontWeight: "bold",
  },  
  scrollView: {
    padding: 10,
    flex:1,
    width:width*.9
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;