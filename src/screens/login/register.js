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

export default function RegisterScreen() {
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

  function handleSubmit() {
    if (password !== confirmPassword) {
      //lógica aqui (WIP)
    }

    const [day, month, year] = birthdate.split("/");
    const birthdateISO8601 = `${year}-${month}-${day}`;

    const JSONBody = {
      name,
      email,
      birthdate: birthdateISO8601,
      gender,
      height,
      weight,
      password,
    };

    console.log(JSONBody);
  }

  return (
    <>
      <Text style={styles.title}>Criar sua Conta</Text>
      {page === 1 && (
        <BackButton
          color={colors.WHITE}
          style={styles.backButton}
          action={() => animateToPage(0)}
        />
      )}
      <View style={styles.background}>
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
            />
            <FloatingLabelInput
              label="Confirmar Senha"
              color={colors.BACKGROUND_RED}
              value={confirmPassword}
              setValueFunction={setConfPassword}
              isPassword={true}
              style={{ marginTop: 30 }}
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
          <Text style={styles.register}>Fazer Login</Text>
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
  backButton: {
    top: 57,
    left: 15,
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
    overflow: "hidden",
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
