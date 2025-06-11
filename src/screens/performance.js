import { StyleSheet, Text, View } from "react-native";
import WhiteIshBackground from "../components/whiteIshBackground";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ProgressBar from "../components/progressBar";
import * as colors from "../constants/colors";
import KCalProgressBar from "../components/calProgressBar";
import {
  AddButtonSVG,
  CupSVG,
  DinnerSVG,
  LunchSVG,
  SnackSVG,
} from "../constants/svgs";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isLoadingAtom } from "../jotai/store";
import { idAtom } from "../jotai/asyncStore";
import axios from "../utils/axios";

export default function PerformanceScreen() {
  const [performance, setPerformance] = useState({});

  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [userId] = useAtom(idAtom);

  useEffect(() => {
    async function fetchPerformance() {
      try {
        setIsLoading(true);
        const response = await axios.get(`performance/${userId}`);

        setPerformance(response.data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) fetchPerformance();
  }, [userId, setIsLoading]);

  return (
    <WhiteIshBackground
      title="Hoje"
      titleDistanceToTop={75}
      screenPercentage={75}
      paddingTop={30}
    >
      <View style={styles.resume}>
        <View style={styles.resumeItem}>
          <Text style={styles.resumeItemTitle}>
            {Number(performance.consumedCalories).toFixed(0)}
          </Text>
          <Text style={styles.resumeItemDescription}>Consumidas</Text>
        </View>
        <AnimatedCircularProgress
          size={150}
          width={5}
          fill={
            (performance.necessaryCalories /
              (performance.necessaryCalories +
                (performance.necessaryCalories -
                  performance.consumedCalories))) *
            100
          }
          tintColor="#F50057"
          backgroundColor="#ddd"
        >
          {() => {
            return (
              <>
                <Text style={styles.kcalGraphNumber}>
                  {parseInt(
                    performance.necessaryCalories -
                      performance.consumedCalories,
                  )}
                </Text>
                <Text style={styles.kcalDescribe}>KCal Restante</Text>
              </>
            );
          }}
        </AnimatedCircularProgress>
        <View style={styles.resumeItem}>
          <Text style={styles.resumeItemTitle}>861</Text>
          <Text style={styles.resumeItemDescription}>Gastas</Text>
        </View>
      </View>
      <View style={styles.progressBars}>
        <ProgressBar
          label="Carboidratos"
          current={Number(performance.consumedCarbs).toFixed(2)}
          total={Number(performance.necessaryCarbs).toFixed(2)}
          color={colors.BACKGROUND_YELLOW}
        />
        <ProgressBar
          label="Proteínas"
          current={Number(performance.consumedProteins).toFixed(2)}
          total={performance.necessaryProteins}
          color={colors.BACKGROUND_YELLOW}
        />
        <ProgressBar
          label="Gordura"
          current={Number(performance.consumedFats).toFixed(2)}
          total={performance.necessaryFats}
          color={colors.BACKGROUND_YELLOW}
        />
      </View>
      <View style={styles.calItem}>
        <CupSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Café da Manhã"
          current={performance.consumedCaloriesBreakfast}
          total={performance.necessaryCaloriesBreakfast}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <LunchSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Almoço"
          current={performance.consumedCaloriesLunch}
          total={performance.necessaryCaloriesLunch}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <DinnerSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Jantar"
          current={performance.consumedCaloriesDinner}
          total={performance.necessaryCaloriesDinner}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <SnackSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Lanches"
          current={performance.consumedCaloriesSnacks}
          total={performance.necessaryCaloriesSnacks}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
    </WhiteIshBackground>
  );
}

const styles = StyleSheet.create({
  resume: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 30,
  },
  resumeItem: {
    marginBottom: 10,
    width: 90,
  },
  resumeItemTitle: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 16,
  },
  resumeItemDescription: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 14,
    opacity: 0.5,
  },
  kcalGraphNumber: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
  },
  kcalDescribe: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    opacity: 0.5,
  },
  progressBars: {
    marginTop: 25,
    flexDirection: "row",
    gap: 30,
    marginBottom: 20,
  },
  calItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },
  hr: {
    width: 380,
    backgroundColor: colors.BACKGROUND_RED,
    height: 1,
  },
});
