import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isLoadingAtom, mealTypeToAddAtom } from "../jotai/store";
import { idAtom } from "../jotai/asyncStore";
import * as colors from "../constants/colors";
import axios from "../utils/axios";
import CrassusButton from "../components/crassusButton";
import WhiteIshBackground from "../components/whiteIshBackground";
import RunIcon from "../../assets/icons/runIcon";


const IconFrame = () => (
  <View style={styles.iconFrame}>
    <RunIcon size={34} color="#F28705" />
  </View>
);

const RunCard = ({ name, distance = 0 }) => (
  <View style={styles.cardContainer}>
    <IconFrame />
    <View style={styles.cardTextArea}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubtitle}>
        {distance.toFixed(2).replace(".", ",")} km percorridos
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
     {runs.map((run, idx) => (
       <RunCard
         key={`${month}-${idx}`}
         name={run.name}
         distance={run.distance}
       />
     ))}
   </View>
 );


export default function RaceScreen() {
  const navigation = useNavigation();
  const [runs, setRuns] = useState([]);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [userId] = useAtom(idAtom);

  useEffect(() => {
    async function fetchRuns() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`races/${userId}`);
//        console.log(data)
        setRuns(data);
      } catch (e) {
        console.error(e.response?.data || e);
      } finally {
        setIsLoading(false);
      }
    }
    if (userId) fetchRuns();
  }, [setIsLoading, userId]);

  const historyByMonth = runs.reduce((acc, run) => {
    const timeStr = run.startTime;
    const dateObj = new Date(timeStr);

    if (isNaN(dateObj)) {
      console.warn("Data inválida para essa corrida:", run);
      return acc;
    }

    const monthLabel = dateObj.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    let section = acc.find((s) => s.month === monthLabel);
    if (!section) {
      section = { month: monthLabel, runs: [] };
      acc.push(section);
    }


    const name = dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    section.runs.push({
      name,
      distance: run.distance ?? 0,
    });

    return acc;
  }, []);


  const handleNewRun = () => navigation.navigate("RunProgress");

  return (
    <>
      <WhiteIshBackground
        title="Suas Corridas"
        titleDistanceToTop={75}
        screenPercentage={75}
        paddingTop={25}
        isScroll={true}
      >
        {historyByMonth.map((g) => (
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
