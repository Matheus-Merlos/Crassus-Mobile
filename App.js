import { StyleSheet } from "react-native";
import WelcomeScreen from "./src/screens/welcomeScreen";
import { LinearGradient } from "expo-linear-gradient";
import * as colors from "./src/constants/colors";

import { useFonts } from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import publicSansBold from "./assets/fonts/PublicSans-Bold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": poppinsRegular,
    "PublicSans-Bold": publicSansBold,
    "Inter-Bold": interBold,
  });

  if (!fontsLoaded) {
    return null;
  }

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
