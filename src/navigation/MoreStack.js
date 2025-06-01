import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as screens from "../constants/screens";
import MoreScreen from "../screens/config/moreScreen";

const Stack = createNativeStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.MORE} component={MoreScreen} />
    </Stack.Navigator>
  );
}
