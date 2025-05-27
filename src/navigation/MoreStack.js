import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import * as screens from "../constants/screens";
import * as colors from "../constants/colors";
import MoreScreen from "../screens/config/moreScreen";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

function addGradient(component) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
        style={{ position: "absolute", width, height }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      />
      {component}
    </View>
  );
}

export default function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screens.MORE}
        children={() => addGradient(<MoreScreen />)}
      />
    </Stack.Navigator>
  );
}
