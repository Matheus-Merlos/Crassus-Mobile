import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WhiteIshBackground from "../../components/whiteIshBackground";
import * as colors from "../../constants/colors";
import { useAtom } from "jotai";
import {
  emailAtom,
  idAtom,
  isLoggedInAtom,
  nameAtom,
  tokenAtom,
} from "../../jotai/asyncStore";
import {
  ArrowSVG,
  DisconnectIconSVG,
  GearSVG,
  UserIconSVG,
} from "../../constants/svgs";
import { useMemo } from "react";

export default function MoreScreen() {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setId] = useAtom(idAtom);
  const [name, setName] = useAtom(nameAtom);
  const [email, setJotaiEmail] = useAtom(emailAtom);
  const [, setToken] = useAtom(tokenAtom);

  const firstNames = useMemo(() => {
    if (!name) return "";
    return name.split(" ").slice(0, 2).join(" ");
  }, [name]);

  function handleDisconnect() {
    setIsLoggedIn(false);
    setId(null);
    setName(null);
    setJotaiEmail(null);
    setToken(null);
  }
  return (
    <WhiteIshBackground
      title="Seu Perfil"
      titleDistanceToTop={75}
      screenPercentage={75}
    >
      <View style={styles.userIcon}>
        <UserIconSVG
          color={colors.BACKGROUND_YELLOW}
          width={100}
          height={100}
        />
      </View>
      <Text style={styles.userTitle}>Olá, {firstNames}!</Text>
      <Text style={styles.userEmail}>{email}</Text>
      <TouchableOpacity style={styles.option}>
        <View style={styles.optionTextIcon}>
          <UserIconSVG
            color={colors.BACKGROUND_YELLOW}
            width={50}
            height={50}
          />
          <Text style={styles.optionText}>Meu Perfil</Text>
        </View>
        <ArrowSVG color={colors.BACKGROUND_YELLOW} width={50} height={50} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleDisconnect}>
        <View style={styles.optionTextIcon}>
          <DisconnectIconSVG
            color={colors.BACKGROUND_YELLOW}
            width={50}
            height={50}
          />
          <Text style={styles.optionText}>Desconectar</Text>
        </View>
        <ArrowSVG color={colors.BACKGROUND_YELLOW} width={50} height={50} />
      </TouchableOpacity>
    </WhiteIshBackground>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    width: 175,
    height: 175,
    borderColor: colors.BACKGROUND_YELLOW,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
  },
  userTitle: {
    fontFamily: "Poppins-SemiBold",
    marginTop: 12,
    fontSize: 26,
  },
  userEmail: {
    fontFamily: "Poppins-Regular",
    opacity: 0.5,
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    justifyContent: "space-between",
    marginTop: 30,
  },
  optionTextIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: 175,
    gap: 20,
  },
  optionText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    opacity: 0.75,
  },
});
