import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RunProgressScreen from "../screens/runProgress";
import RunFinishedScreen from "../screens/runFinished";
import RaceScreen from "../screens/race";

const Stack = createNativeStackNavigator();

export default function RaceStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RaceHistory"
    >
      <Stack.Screen name="RaceHistory" component={RaceScreen} />
      <Stack.Screen name="RunProgress" component={RunProgressScreen} />
      <Stack.Screen name="RunFinished" component={RunFinishedScreen} />
    </Stack.Navigator>
  );
}
