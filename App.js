import { StyleSheet, Dimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as colors from "./src/constants/colors";

import { useFonts } from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import publicSansBold from "./assets/fonts/PublicSans-Bold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";
import interLight from "./assets/fonts/Inter-Light.ttf";
import poppinsSemiBold from "./assets/fonts/Poppins-SemiBold.ttf";
import poppinsBlackItalic from "./assets/fonts/Poppins-BlackItalic.ttf";

import { useSelector } from "react-redux";

import WelcomeScreen from "./src/screens/welcome";
import LoginScreen from "./src/screens/login/login";
import RegisterScreen from "./src/screens/login/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import * as screens from "./src/constants/screens";
import BottomTabNavigator from "./src/navigation/MainTabs";
import MainTab from "./src/navigation/MainTabs";
import AppNavigator from "./src/navigation/AppNavigator";

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
const Stack = createNativeStackNavigator();

export default function App() {
  const isLoggedIn = true;
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": poppinsRegular,
    "Poppins-SemiBold": poppinsSemiBold,
    "PublicSans-Bold": publicSansBold,
    "Poppins-BlackItalic": poppinsBlackItalic,
    "Inter-Bold": interBold,
    "Inter-Light": interLight,
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <View style={styles.mainView}>
        <AppNavigator />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: "relative",
  },
});
