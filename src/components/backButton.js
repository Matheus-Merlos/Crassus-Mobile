import { Pressable, StyleSheet } from "react-native";
import { BackArrowSVG } from "../constants/svgs";

export default function BackButton({ color, action = () => {}, style = {} }) {
  return (
    <Pressable onPress={action} style={[styles.button, style]}>
      <BackArrowSVG width={50} height={50} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
  },
});
