import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import RunIcon from "../../assets/icons/runIcon";
import NutritionIcon from "../../assets/icons/nutritionIcon";
import MoreIcon from "../../assets/icons/more";
import PerformanceIcon from "../../assets/icons/performanceIcon";
import PerformanceScreen from "../screens/performance";
import NutritionScreen from "../screens/nutrition/nutrition";
import MoreScreen from "../screens/config/moreScreen";
import { Dimensions, View } from "react-native";
import * as colors from "../constants/colors";
import * as screens from "../constants/screens";

const { width, height } = Dimensions.get("window");

function addGradient(component) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
        style={{
          position: "absolute",
          width,
          height,
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      />
      {component}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
          marginTop: 6,
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "red",
      }}
    >
      <Tab.Screen
        name={screens.PERFORMANCE}
        children={() => addGradient(<PerformanceScreen />)}
        options={{
          tabBarIcon: () => <PerformanceIcon />,
        }}
      />
      <Tab.Screen
        name={screens.NUTRITION}
        children={() => addGradient(<NutritionScreen />)}
        options={{
          tabBarIcon: () => <NutritionIcon />,
        }}
      />
      {/*name={screens.RUN}
        children={() => addGradient(<RunScreen />)}
        options={{
          tabBarIcon: () => <RunIcon />,
        }}
      /> */}
      <Tab.Screen
        name={screens.MORE}
        children={() => addGradient(<MoreScreen />)}
        options={{
          tabBarIcon: () => <MoreIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
