import { TouchableOpacity, Text } from "react-native";
import * as colors from "../constants/colors";

export default function CrassusButton({ text, color, style }) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: color,
          borderRadius: 50,
          paddingVertical: 15,
          paddingHorizontal: 75,
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors.WHITE,
          fontSize: 18,
          fontFamily: "Inter-Bold",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
