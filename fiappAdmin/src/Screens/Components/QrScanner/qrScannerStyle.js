import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const overlayColor = "white"; // Color de la superposición

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 40,
    fontSize: 18,
    color: 'white',
  },
  overlayContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    width: width,
    height: height * 0.4,
    backgroundColor: overlayColor,
  },
  scannerArea: {
    width: width * 0.8,
    height: width * 0.8,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default styles;
