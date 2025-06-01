import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import publicSansBold from "./assets/fonts/PublicSans-Bold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";
import interLight from "./assets/fonts/Inter-Light.ttf";
import poppinsSemiBold from "./assets/fonts/Poppins-SemiBold.ttf";
import poppinsBlackItalic from "./assets/fonts/Poppins-BlackItalic.ttf";
import { Provider } from "jotai";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
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
    <Provider>
      <View style={styles.mainView}>
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: "relative",
  },
});
