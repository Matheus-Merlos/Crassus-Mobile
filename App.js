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
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import Icon from "react-native-vector-icons/Feather";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 20, fontWeight: "bold" }}
      text2Style={{ fontSize: 14 }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Icon name="check-circle" size={24} color="green" />
        </View>
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 14, fontFamily: "Inter-Bold" }}
      text2Style={{ fontSize: 14 }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 5,
          }}
        >
          <Icon name="x-circle" size={24} color="red" />
        </View>
      )}
    />
  ),
};

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
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: "relative",
  },
});
