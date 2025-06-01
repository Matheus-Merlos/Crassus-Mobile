import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerformanceScreen from "../screens/performance";
import * as screens from "../constants/screens";

const Stack = createNativeStackNavigator();

export default function PerformanceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.PERFORMANCE} component={PerformanceScreen} />
    </Stack.Navigator>
  );
}
