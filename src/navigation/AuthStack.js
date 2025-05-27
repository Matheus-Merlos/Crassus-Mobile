import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import * as colors from "../constants/colors";
import * as screens from "../constants/screens";
import WelcomeScreen from "../screens/welcome";
import LoginScreen from "../screens/login/login";
import RegisterScreen from "../screens/login/register";

const Stack = createNativeStackNavigator();

function addGradient(component) {
  const { width, height } = Dimensions.get("window");
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

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={screens.WELCOME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={screens.WELCOME}
        children={() => addGradient(<WelcomeScreen />)}
      />
      <Stack.Screen
        name={screens.LOGIN}
        children={() => addGradient(<LoginScreen />)}
      />
      <Stack.Screen
        name={screens.REGISTER}
        children={() => addGradient(<RegisterScreen />)}
      />
    </Stack.Navigator>
  );
}
