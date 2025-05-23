import { StyleSheet, Dimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as colors from "./src/constants/colors";

//Imports exclusivos de fontes
import { useFonts } from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import publicSansBold from "./assets/fonts/PublicSans-Bold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";
import interLight from "./assets/fonts/Inter-Light.ttf";

//Imports exclusivos para navigation

//Imports do react redux
import { Provider } from "react-redux";
import { loginPersistor, loginStore } from "./src/redux/stores";
import { PersistGate } from "redux-persist/integration/react";

import WelcomeScreen from "./src/screens/welcome";
import LoginScreen from "./src/screens/login/login";
import RegisterScreen from "./src/screens/login/register";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": poppinsRegular,
    "PublicSans-Bold": publicSansBold,
    "Inter-Bold": interBold,
    "Inter-Light": interLight,
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={loginStore}>
      <PersistGate loading={null} persistor={loginPersistor}>
        <LinearGradient
          colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
          style={styles.background}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
        <View style={styles.mainView}>
          <RegisterScreen />
        </View>
      </PersistGate>
    </Provider>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainView: {
    width,
    height,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width,
    height,
  },
});
