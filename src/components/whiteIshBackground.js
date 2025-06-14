import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import * as colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function WhiteIshBackground({
  title = "",
  screenPercentage = 70,
  titleDistanceToTop = 120,
  isScroll = false,
  paddingTop = 75,
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
      paddingTop: paddingTop,
      alignItems: "center",
      overflow: "hidden",
    },
  });
  return (
    <>
      <View style={{ flex: 1, width, height }}>
        <LinearGradient
          colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
          style={{ position: "absolute", width, height, zIndex: -10 }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
        <Text style={styles.title}>{title}</Text>
        {isScroll ? (
          <ScrollView contentContainerStyle={styles.background}>
            <ScrollView>{children}</ScrollView>
          </ScrollView>
        ) : (
          <View style={styles.background}>{children}</View>
        )}
      </View>
    </>
  );
}
