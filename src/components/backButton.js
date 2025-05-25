import { Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function BackButton({ color, action = () => {}, style = {} }) {
  return (
    <Pressable onPress={action} style={[styles.button, style]}>
      <Svg width={50} height={50} viewBox="0 0 24 24" fill={color}>
        <Path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
  },
});
