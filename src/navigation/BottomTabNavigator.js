import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as screens from "../constants/screens";
import RunIcon from "../../assets/icons/runIcon";
import NutritionIcon from "../../assets/icons/nutritionIcon";
import MoreIcon from "../../assets/icons/more";
import PerformanceIcon from "../../assets/icons/performanceIcon";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={screens.PERFORMANCE}
        options={{
          tabBarIcon: () => <PerformanceIcon />,
        }}
      />
      <Tab.Screen
        name={screens.NUTRITION}
        options={{
          tabBarIcon: () => <NutritionIcon />,
        }}
      />
      <Tab.Screen
        name={screens.RUN}
        options={{
          tabBarIcon: () => <RunIcon />,
        }}
      />
      <Tab.Screen
        name={screens.MORE}
        options={{
          tabBarIcon: () => <MoreIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
