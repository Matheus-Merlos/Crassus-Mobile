import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import publicSansBold from "./assets/fonts/PublicSans-Bold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";
import interLight from "./assets/fonts/Inter-Light.ttf";
import poppinsSemiBold from "./assets/fonts/Poppins-SemiBold.ttf";
import poppinsBlackItalic from "./assets/fonts/Poppins-BlackItalic.ttf";
import { useAtom } from "jotai";
import { isLoadingAtom } from "./src/jotai/store";

import AppNavigator from "./src/navigation/AppNavigator";
import Spinner from "react-native-loading-spinner-overlay";

export default function App() {
  const [isLoading] = useAtom(isLoadingAtom);

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
    <View style={styles.mainView}>
      <AppNavigator />
      <Spinner
        visible={isLoading}
        textContent={"Carregando..."}
        textStyle={{ color: "#FFF" }}
        animation="fade"
        overlayColor="rgba(0,0,0,0.6)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: "relative",
  },
});
