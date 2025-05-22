import { StyleSheet } from "react-native";
import WelcomeScreen from "./src/screens/welcomeScreen";
import { LinearGradient } from "expo-linear-gradient";
import * as colors from "./src/constants/colors";

//Imports exclusivos de fontes
import { useFonts } from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import publicSansBold from "./assets/fonts/PublicSans-Bold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": poppinsRegular,
    "PublicSans-Bold": publicSansBold,
    "Inter-Bold": interBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const RootStack = createNativeStackNavigator({
    initialRouteName: "Welcome",
    screens: {
      Welcome: WelcomeScreen,
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (
    <LinearGradient
      colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
      style={styles.background}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
    >
      <WelcomeScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
