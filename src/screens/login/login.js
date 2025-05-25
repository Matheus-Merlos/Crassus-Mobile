import { Dimensions, StyleSheet, View, Text } from "react-native";
import * as colors from "../../constants/colors";
import FloatingLabelInput from "../../components/floatingLabelInput";
import { useState } from "react";
import CrassusButton from "../../components/crassusButton";
import * as actions from "../../redux/actions";
import { useDispatch } from "react-redux";
import BackButton from "../../components/backButton";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../../constants/screens";

export default function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  function handleSubmit() {
    //dispatch(actions.login(email, password));
  }

  const navigation = useNavigation();

  return (
    <>
      <BackButton
        color={colors.WHITE}
        style={{ top: 57, left: 15 }}
        action={() => navigation.goBack()}
      />
      <Text style={styles.title}>Fazer Login</Text>
      <View style={styles.background}>
        <FloatingLabelInput
          label="E-mail"
          color={colors.BACKGROUND_RED}
          value={email}
          setValueFunction={setEmail}
        />
        <FloatingLabelInput
          label="Senha"
          color={colors.BACKGROUND_RED}
          value={password}
          setValueFunction={setPassword}
          isPassword={true}
          style={{ marginTop: 30 }}
        />
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        <CrassusButton
          text="Fazer Login"
          color={colors.BACKGROUND_YELLOW}
          style={{ marginTop: 150 }}
          onPress={handleSubmit}
        />
        <View style={styles.texts}>
          <Text style={styles.dontHave}>Não tem uma conta?</Text>
          <Text
            style={styles.register}
            onPress={() => navigation.navigate(screens.REGISTER)}
          >
            Cadastre-se
          </Text>
        </View>
      </View>
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    fontFamily: "PublicSans-Bold",
    color: colors.WHITE,
    fontSize: 40,
    left: 30,
    top: 120,
  },
  background: {
    marginTop: 150,
    position: "absolute",
    width,
    height: height * 0.7,
    backgroundColor: colors.WHITE_ISH,
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 75,
    alignItems: "center",
  },
  forgotPassword: {
    fontFamily: "Inter-Bold",
    color: colors.BACKGROUND_YELLOW,
    fontSize: 20,
    marginLeft: 125,
  },
  texts: {
    marginLeft: 175,
    marginTop: 75,
  },
  dontHave: {
    fontFamily: "Inter-Light",
    fontSize: 18,
    color: colors.BACKGROUND_RED,
  },
  register: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.BACKGROUND_YELLOW,
    marginLeft: 60,
  },
});
