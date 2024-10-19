import { Dimensions, SafeAreaView ,StyleSheet } from "react-native";
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 0,
    paddingBottom: 0,
    marginBottom: 0,
    overflow: "hidden",
  },
  cardTitle: {
    flexShrink: 1,
    flexGrow: 0,
  },
  cardImg: {
    height: height * 0.18,
    resizeMode: "contain",
    overflow: "hidden",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  cardRowTotalPriceCombo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContentTotalPrice: {
    backgroundColor: "#f1f1f1",
    borderBottomRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: -20,
  },
  cardContentnameStore: {
    backgroundColor: "#f1f1f1",
    borderBottomLeftRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: -20,
  },
  cardTxtTotalPrice: {
    fontWeight: "bold",
    width: "auto",
  },
  cardDescription: {
    flexShrink: 1,
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1F8169",
    marginHorizontal: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,  // Ajusta la posición del paginador según tu diseño
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'gray', // Color para los círculos inactivos
  },
  activeDot: {
    backgroundColor: '#1F8169',  // Color para el círculo activo
    width: 30,  // Un poco más grande para indicar el activo
    height: 12,
  },
  inactiveDot: {
    backgroundColor: '#ccc', // Color para los círculos inactivos
  },
});

export default styles;