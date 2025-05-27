import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as colors from "../constants/colors";
import * as screens from "../constants/screens";

//screens and stacks
import PerformanceScreen from "../screens/performance";

//icons
import PerformanceIcon from "../../assets/icons/performanceIcon";
import NutritionIcon from "../../assets/icons/nutritionIcon";
import RaceStack from "./RaceStack";
import MealsStack from "./MealsStack";
import MoreScreen from "../screens/config/moreScreen";
import RunIcon from "../../assets/icons/runIcon";
import MoreIcon from "../../assets/icons/more";
import MoreStack from "./MoreStack";
import PerformanceStack from "./PerformanceStack";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 8,
        },
        tabBarActiveTintColor: colors.PRIMARY_RED,
        tabBarInactiveTintColor: colors.PRIMARY_RED,
        tabBarStyle: { backgroundColor: colors.WHITE_ISH },
      }}
    >
      {/* Desempenho */}
      <Tab.Screen
        name={screens.PERFORMANCE}
        component={PerformanceStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PerformanceIcon color={color} size={size} />
          ),
        }}
      />

      {/* Nutrição */}
      <Tab.Screen
        name={screens.NUTRITION}
        component={MealsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <NutritionIcon color={color} size={size} />
          ),
        }}
      />

      {/* Corridas com stack interno */}
      <Tab.Screen
        name={screens.RACE}
        component={RaceStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <RunIcon color={color} size={size} />
          ),
        }}
      />

      {/* Mais */}
      <Tab.Screen
        name={screens.MORE}
        component={MoreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MoreIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
