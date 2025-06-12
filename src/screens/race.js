// src/screens/race.js — Tela "Suas Corridas" usando constantes de cor
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as colors from "../constants/colors";

import CrassusButton from "../components/crassusButton";
import WhiteIshBackground from "../components/whiteIshBackground";
import RunIcon from "../../assets/icons/runIcon";

// ────────────────────────────────────────────────────────────────────────────────
// Componentes auxiliares
// ────────────────────────────────────────────────────────────────────────────────

const IconFrame = () => (
  <View style={styles.iconFrame}>
    <RunIcon size={34} color="#F28705" />
  </View>
);

const RunCard = ({ name, distance }) => (
  <View style={styles.cardContainer}>
    <IconFrame />
    <View style={styles.cardTextArea}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubtitle}>
        {distance.toString().replace(".", ",")} km percorridos
      </Text>
    </View>
    <MaterialCommunityIcons
      name="pin"
      size={28}
      color={colors.BACKGROUND_RED}
    />
  </View>
);

const MonthSection = ({ month, runs }) => (
  <View style={styles.monthSection}>
    <Text style={styles.monthLabel}>{month}</Text>
    {runs.map((run) => (
      <RunCard key={run.name} name={run.name} distance={run.distance} />
    ))}
  </View>
);

export default function RaceScreen() {
  const navigation = useNavigation();

  const mockHistory = [
    {
      month: "Abril",
      runs: [{ name: "Corrida 97", distance: 5.41 }],
    },
    {
      month: "Março",
      runs: [
        { name: "Corrida 96", distance: 2.69 },
        { name: "Corrida 95", distance: 2.69 },
        { name: "Corrida 94", distance: 3.71 },
        { name: "Corrida 93", distance: 4.65 },
        { name: "Corrida 92", distance: 4.29 },
        { name: "Corrida 91", distance: 4.29 },
        { name: "Corrida 90", distance: 4.29 },
      ],
    },
  ];

  const handleNewRun = () => {
    navigation.navigate("RunProgress");
  };

  return (
    <>
      <WhiteIshBackground
        title="Suas Corridas"
        titleDistanceToTop={75}
        screenPercentage={75}
        paddingTop={25}
        isScroll={true}
      >
        {mockHistory.map((g) => (
          <MonthSection key={g.month} month={g.month} runs={g.runs} />
        ))}
      </WhiteIshBackground>

      <View style={styles.buttonContainer}>
        <CrassusButton
          text="Nova Corrida"
          color={colors.BACKGROUND_YELLOW}
          style={styles.addButton}
          onPress={handleNewRun}
        />
      </View>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Estilos
// ────────────────────────────────────────────────────────────────────────────────

const { width } = Dimensions.get("window");

const CARD_HEIGHT = 90;
const CARD_WIDTH = width * 0.9;

const styles = StyleSheet.create({
  monthSection: {
    marginBottom: 24,
  },
  monthLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: colors.BACKGROUND_RED,
    marginBottom: 10,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.WHITE_ISH,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    alignSelf: "center",
  },
  iconFrame: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE_ISH,
    borderRadius: 12,
    marginRight: 14,
  },
  cardTextArea: { flex: 1 },
  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "rgba(0,0,0,0.9)",
  },
  cardSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "rgba(0,0,0,0.6)",
    marginTop: 2,
  },
  addButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.BACKGROUND_YELLOW,
    paddingVertical: 10,
    paddingHorizontal: 26,
    width: width * 0.6,
  },
  buttonContainer: {
    position: "absolute",
    height: 120,
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE_ISH,
    bottom: 0,
  },
});
