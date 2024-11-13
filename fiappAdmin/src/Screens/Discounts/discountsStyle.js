import {  StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  rowTitleP: {
    paddingTop: 5,
    flexDirection: "row",
  },
  titleRecordP: {
    fontSize: 28,
    fontWeight: "bold",
  },
  rowTextInput: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    height: 60,
  },
  inputRecordP: {
    borderRadius: 18,
    height: "100%",
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.37,
    shadowRadius: 17.49,
    elevation: 19,
  },
  rowContentPromotions: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  contentSCPromotion: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "white",
  },
  promotion: {
    flexDirection: "row",
    height: 130,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 4,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  contentImg: {
    flexDirection: "column",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgPromotion: {
    width: "90%",
    height: "90%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentData: {
    flexDirection: "column",
    width: "55%",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  dataTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  dataValidity: {
    fontSize: 14,
    color: "#555",
  },
  dataDescription: {
    fontSize: 14,
    color: "#777",
  },
  dataRowPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow:'hidden',
    flexWrap:'wrap'
    
  },
  dataPriceBefore: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  dataPriceNow: {
    fontWeight: "bold",
    color: "#FF6347",
  },
  contentDiscount: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6347",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
  },
  dataTxtDiscount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  rowBtnAddPromotion: {
    paddingBottom: 30,
    flexDirection: "row",
  },
  btnAddPromotion: {
    backgroundColor: "#33BC82",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
