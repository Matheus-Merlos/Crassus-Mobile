import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as screens from "../constants/screens";
import NutritionScreen from "../screens/nutrition/nutrition";
import AddMealScreen from "../screens/nutrition/addMeal";

const Stack = createNativeStackNavigator();

export default function MealsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.NUTRITION} component={NutritionScreen} />
      <Stack.Screen name={screens.ADDMEAL} component={AddMealScreen} />
    </Stack.Navigator>
  );
}
