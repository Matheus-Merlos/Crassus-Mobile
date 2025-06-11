import { StyleSheet, View, Text } from "react-native";
import * as colors from "../../constants/colors";
import FloatingLabelInput from "../../components/floatingLabelInput";
import { useState } from "react";
import CrassusButton from "../../components/crassusButton";
import BackButton from "../../components/backButton";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../../constants/screens";
import WhiteIshBackground from "../../components/whiteIshBackground";
import { useAtom } from "jotai";
import {
  emailAtom,
  idAtom,
  isLoggedInAtom,
  nameAtom,
  tokenAtom,
} from "../../jotai/asyncStore";
import axios from "../../utils/axios";
import { isLoadingAtom } from "../../jotai/store";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setId] = useAtom(idAtom);
  const [, setName] = useAtom(nameAtom);
  const [, setJotaiEmail] = useAtom(emailAtom);
  const [, setToken] = useAtom(tokenAtom);

  const [, setIsLoading] = useAtom(isLoadingAtom);

  const [emailFieldMessage, setEmailFieldMessage] = useState("");
  const [passwordFieldMessage, setPasswordFieldMessage] = useState("");

  async function handleSubmit() {
    const requestData = {
      email,
      password,
    };

    if (!email) {
      setEmailFieldMessage("Forneça um e-mail válido");
      return;
    }

    if (!password) {
      setPasswordFieldMessage("Forneça uma senha válida");
      return;
    }

    let request;
    setIsLoading(true);
    try {
      request = await axios.post("login", requestData);
    } catch (error) {
      const message = error.response.data.message;
      if (message[0].includes("email")) {
        setEmailFieldMessage("Forneça um e-mail válido");
        return;
      }

      switch (error.response.status) {
        case 404: {
          Toast.show({
            type: "error",
            text1: "Não existe um usuário com este e-mail",
          });
          break;
        }
        case 400: {
          Toast.show({
            type: "error",
            text1: "Senha incorreta para este usuário",
          });
          break;
        }
      }
      return;
    } finally {
      setIsLoading(false);
    }

    const { id, name, email: responseEmail, token } = request.data;

    setIsLoggedIn(true);
    setId(id);
    setName(name);
    setJotaiEmail(responseEmail);
    setToken(token);
  }
  const navigation = useNavigation();

  return (
    <>
      <BackButton
        color={colors.WHITE}
        style={{ top: 57, left: 15 }}
        action={() => navigation.goBack()}
      />
      <WhiteIshBackground title="Fazer Login">
        <FloatingLabelInput
          label="E-mail"
          color={colors.BACKGROUND_RED}
          value={email}
          setValueFunction={setEmail}
          warningMessage={emailFieldMessage}
        />
        <FloatingLabelInput
          label="Senha"
          color={colors.BACKGROUND_RED}
          value={password}
          setValueFunction={setPassword}
          isPassword={true}
          style={{ marginTop: 30 }}
          warningMessage={passwordFieldMessage}
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
            onPress={() => navigation.replace(screens.REGISTER)}
          >
            Cadastre-se
          </Text>
        </View>
      </WhiteIshBackground>
    </>
  );
}

const styles = StyleSheet.create({
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
