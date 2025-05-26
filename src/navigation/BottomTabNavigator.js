import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RunIcon from "../../assets/icons/runIcon";
import NutritionIcon from "../../assets/icons/nutritionIcon";
import MoreIcon from "../../assets/icons/more";
import PerformanceIcon from "../../assets/icons/performanceIcon";

import PerformanceScreen from "../screens/performance";
import NutritionScreen from "../screens/nutrition/nutrition";
import MoreScreen from "../screens/config/moreScreen";
import RaceScreen from "../screens/race";
import RunProgressScreen from "../screens/runProgress";
import RunFinishedScreen from "../screens/runFinished";

import * as colors from "../constants/colors";
import * as screens from "../constants/screens";

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

function RaceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RaceHistory" children={() => addGradient(<RaceScreen />)} />
      <Stack.Screen name="RunProgress" component={RunProgressScreen} />
      <Stack.Screen name="RunFinished" component={RunFinishedScreen} />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => (
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
      children={() => addGradient(<PerformanceScreen />)}
      options={{
        tabBarIcon: ({ color, size }) => <PerformanceIcon color={color} size={size} />,
      }}
    />

    {/* Nutrição */}
    <Tab.Screen
      name={screens.NUTRITION}
      children={() => addGradient(<NutritionScreen />)}
      options={{
        tabBarIcon: ({ color, size }) => <NutritionIcon color={color} size={size} />,
      }}
    />

    {/* Corridas com stack interno */}
    <Tab.Screen
      name={screens.Race}
      component={RaceStack}
      options={{
        tabBarIcon: ({ color, size }) => <RunIcon color={color} size={size} />,
      }}
    />

    {/* Mais */}
    <Tab.Screen
      name={screens.MORE}
      children={() => addGradient(<MoreScreen />)}
      options={{
        tabBarIcon: ({ color, size }) => <MoreIcon color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
