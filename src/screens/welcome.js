import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import crassusIcon from "../../assets/icons/crassus-icon.png";
import * as colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../constants/screens";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const { width, height } = Dimensions.get("window");

  return (
    <>
      <View style={{ position: "absolute", flex: 1 }}>
        <LinearGradient
          colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
          style={{ position: "absolute", width, height }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={crassusIcon} style={styles.icon}></Image>
        <Text style={styles.title}>Crassus</Text>
        <Text style={styles.welcome}>Bem-vindo!</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={buttonStyles.loginButton}
            onPress={() => navigation.navigate(screens.LOGIN)}
          >
            <Text style={buttonStyles.loginText}>Fazer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.registerButton}
            onPress={() => navigation.navigate(screens.REGISTER)}
          >
            <Text style={buttonStyles.registerText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    marginTop: 150,
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    color: colors.WHITE,
    fontSize: 25,
  },
  welcome: {
    marginTop: 50,
    fontFamily: "PublicSans-Bold",
    fontSize: 35,
    color: colors.WHITE,
    textAlign: "center",
  },
  buttons: {
    marginTop: 100,
  },
});

const buttonStyles = StyleSheet.create({
  loginButton: {
    borderWidth: 2,
    borderColor: colors.WHITE,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },

  registerButton: {
    backgroundColor: colors.WHITE,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  registerText: {
    color: colors.BACKGROUND_RED,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
});
