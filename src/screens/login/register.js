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
  const [gender, setGender] = useState("");

  function animateToPage(pageNumber) {
    setPage(pageNumber);
    Animated.timing(slideAnim, {
      toValue: -width * pageNumber,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  return (
    <>
      <Text style={styles.title}>Criar sua Conta</Text>
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
              setValueFunction={setBirthDate}
            />
            <FloatingLabelInput
              label="Altura"
              color={colors.BACKGROUND_RED}
              value={height}
              setValueFunction={setHeight}
              style={{ marginTop: 30 }}
            />
            <FloatingLabelInput
              label="Peso"
              color={colors.BACKGROUND_RED}
              value={weight}
              setValueFunction={setWeight}
              style={{ marginTop: 30 }}
            />
            <FloatingLabelInput
              label="Gênero"
              color={colors.BACKGROUND_RED}
              value={gender}
              setValueFunction={setGender}
              style={{ marginTop: 30 }}
            />
            <CrassusButton
              text="Continuar"
              color={colors.BACKGROUND_YELLOW}
              style={{ marginTop: 15 }}
              onPress={() => animateToPage(0)}
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
});
