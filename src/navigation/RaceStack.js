/* eslint-disable react/no-children-prop */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RunProgressScreen from "../screens/runProgress";
import RunFinishedScreen from "../screens/runFinished";
import * as colors from "../constants/colors";
import RaceScreen from "../screens/race";

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

export default function RaceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RaceHistory"
        children={() => addGradient(<RaceScreen />)}
      />
      <Stack.Screen name="RunProgress" component={RunProgressScreen} />
      <Stack.Screen name="RunFinished" component={RunFinishedScreen} />
    </Stack.Navigator>
  );
}
