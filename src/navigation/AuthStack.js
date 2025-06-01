import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as screens from "../constants/screens";
import WelcomeScreen from "../screens/welcome";
import LoginScreen from "../screens/login/login";
import RegisterScreen from "../screens/login/register";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={screens.WELCOME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={screens.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={screens.LOGIN} component={LoginScreen} />
      <Stack.Screen name={screens.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
