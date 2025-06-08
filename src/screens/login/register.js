import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import * as colors from "../../constants/colors";
import FloatingLabelInput from "../../components/floatingLabelInput";
import { useRef, useState } from "react";
import CrassusButton from "../../components/crassusButton";
import BackButton from "../../components/backButton";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../../constants/screens";
import WhiteIshBackground from "../../components/whiteIshBackground";
import axios from "../../utils/axios";
import { useAtom } from "jotai";
import { isLoadingAtom } from "../../jotai/store";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [page, setPage] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");

  const [birthdate, setBirthDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState(null);

  const [, setIsLoading] = useAtom(isLoadingAtom);

  const genders = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
  ];

  function animateToPage(pageNumber) {
    setPage(pageNumber);
    Animated.timing(slideAnim, {
      toValue: -width * pageNumber,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  //Função pra deixar a data certinho no formato DD/MM/AAAA
  function handleBirthdateChange(text) {
    let cleanedText = text.replace(/\D/g, "");

    if (cleanedText.length > 2 && cleanedText.length <= 4) {
      cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    } else if (cleanedText.length > 4) {
      cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}/${cleanedText.slice(4, 8)}`;
    }

    setBirthDate(cleanedText);
  }

  const [passwordFieldMessage, setPasswordFieldMessage] = useState("");

  async function handleSubmit() {
    if (password !== confirmPassword) {
      setPasswordFieldMessage("As senhas não coincidem");
      animateToPage(0);
      return;
    }

    const requestData = {
      name,
      email,
      password,
      birthdate,
      gender,
      height: height.replaceAll(",", "."),
      weight: weight.replaceAll(",", "."),
    };

    setIsLoading(true);
    try {
      await axios.post("register", requestData);
    } catch (error) {
      console.log(error.response.data);
      return;
    } finally {
      setIsLoading(false);
    }

    navigation.navigate(screens.LOGIN);
  }

  return (
    <>
      {page === 0 && (
        <BackButton
          color={colors.WHITE}
          style={styles.backButton}
          action={() => navigation.goBack()}
        />
      )}
      {page === 1 && (
        <BackButton
          color={colors.WHITE}
          style={styles.backButton}
          action={() => animateToPage(0)}
        />
      )}
      <WhiteIshBackground title="Criar sua Conta">
        <Animated.View
          style={[styles.slider, { transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.page}>
            <FloatingLabelInput
              label="Nome Completo"
              color={colors.BACKGROUND_RED}
              value={name}
              setValueFunction={setName}
            />
            <FloatingLabelInput
              label="E-Mail"
              color={colors.BACKGROUND_RED}
              value={email}
              setValueFunction={setEmail}
              style={{ marginTop: 30 }}
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
            <FloatingLabelInput
              label="Confirmar Senha"
              color={colors.BACKGROUND_RED}
              value={confirmPassword}
              setValueFunction={setConfPassword}
              isPassword={true}
              style={{ marginTop: 30 }}
              warningMessage={passwordFieldMessage}
            />
            <CrassusButton
              text="Continuar"
              color={colors.BACKGROUND_YELLOW}
              style={{ marginTop: 15 }}
              onPress={() => animateToPage(1)}
            />
          </View>
          <View style={styles.page}>
            <FloatingLabelInput
              label="Data de Nascimento"
              color={colors.BACKGROUND_RED}
              value={birthdate}
              setValueFunction={handleBirthdateChange}
            />
            <FloatingLabelInput
              label="Altura (em M)"
              color={colors.BACKGROUND_RED}
              value={height}
              setValueFunction={setHeight}
              style={{ marginTop: 30 }}
            />
            <FloatingLabelInput
              label="Peso (em Kg)"
              color={colors.BACKGROUND_RED}
              value={weight}
              setValueFunction={setWeight}
              style={{ marginTop: 30 }}
            />
            <View style={styles.genderSelector}>
              <Text style={styles.genderLabel}>Gênero</Text>
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.genderPlaceholderStyle}
                data={genders}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Selecione o gênero..."
                value={gender}
                onChange={(item) => {
                  setGender(item.value);
                }}
              />
            </View>
            <CrassusButton
              text="Cadastrar-se"
              color={colors.BACKGROUND_YELLOW}
              style={{ marginTop: 50 }}
              onPress={handleSubmit}
            />
          </View>
        </Animated.View>
        <View style={styles.texts}>
          <Text style={styles.dontHave}>Já tem uma conta?</Text>
          <Text
            style={styles.register}
            onPress={() => navigation.replace(screens.LOGIN)}
          >
            Fazer Login
          </Text>
        </View>
      </WhiteIshBackground>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backButton: {
    top: 57,
    left: 15,
  },
  slider: {
    flexDirection: "row",
    width: width * 2,
    marginLeft: 415,
  },
  page: {
    width,
    alignItems: "center",
  },
  texts: {
    marginLeft: 200,
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
    marginLeft: 55,
  },
  genderSelector: {
    marginTop: 10,
    width: 350,
    padding: 3,
  },
  genderLabel: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.BACKGROUND_RED,
    top: -2.5,
  },
  dropdown: {
    borderBottomWidth: 0.75,
    borderBottomColor: colors.BACKGROUND_RED,
  },
  selectedTextStyle: {
    border: "none",
    fontFamily: "Inter-Light",
    fontSize: 20,
  },
  genderPlaceholderStyle: {
    fontFamily: "Inter-Light",
    fontSize: 20,
    opacity: 0.5,
  },
});
