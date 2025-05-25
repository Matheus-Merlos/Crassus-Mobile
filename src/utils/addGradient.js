import { Dimensions, View } from "react-native";
import { LinearGradient } from "react-native-svg";
import * as colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function addGradient(component) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
        style={{
          position: "absolute",
          width,
          height,
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      />
      {component}
    </View>
  );
}
