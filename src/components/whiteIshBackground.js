import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as colors from "../constants/colors";

export default function WhiteIshBackground({
  title = "",
  screenPercentage = 70,
  titleDistanceToTop = 120,
  children,
}) {
  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    title: {
      position: "absolute",
      fontFamily: "PublicSans-Bold",
      color: colors.WHITE,
      fontSize: 40,
      left: 30,
      top: titleDistanceToTop,
    },
    background: {
      position: "absolute",
      width,
      height: height * (screenPercentage / 100),
      backgroundColor: colors.WHITE_ISH,
      bottom: 0,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingTop: 75,
      alignItems: "center",
      overflow: "hidden",
    },
  });
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.background}>{children}</View>
    </>
  );
}
