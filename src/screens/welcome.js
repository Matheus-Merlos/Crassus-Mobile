import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import crassusIcon from "../../assets/icons/crassus-icon.png";
import * as colors from "../constants/colors";

export default function WelcomeScreen() {
  return (
    <View>
      <Image source={crassusIcon} style={styles.icon}></Image>
      <Text style={styles.title}>Crassus</Text>
      <Text style={styles.welcome}>Bem-vindo!</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={buttonStyles.loginButton}>
          <Text style={buttonStyles.loginText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyles.registerButton}>
          <Text style={buttonStyles.registerText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
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
