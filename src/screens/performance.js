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

export default function PerformanceScreen() {
  const mockData = {
    totalCalories: 2238,
    consumedCalories: 1541,
    missingCalories: 697,
    burntCalories: 561,

    proteins: {
      necessary: 103,
      eaten: 35,
    },
    carbs: {
      necessary: 258,
      eaten: 206,
    },
    fats: {
      necessary: 68,
      eaten: 32,
    },

    breakfast: {
      necessary: 700,
      eaten: 56,
    },
    lunch: {
      necessary: 819,
      eaten: 856,
    },
    dinner: {
      necessary: 540,
      eaten: 379,
    },
    lunches: {
      necessary: 126,
      eaten: 0,
    },
  };
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
            {mockData.consumedCalories}
          </Text>
          <Text style={styles.resumeItemDescription}>Consumidas</Text>
        </View>
        <AnimatedCircularProgress
          size={150}
          width={5}
          fill={
            (mockData.totalCalories /
              (mockData.totalCalories + mockData.missingCalories)) *
            100
          }
          tintColor="#F50057"
          backgroundColor="#ddd"
        >
          {() => {
            return (
              <>
                <Text style={styles.kcalGraphNumber}>
                  {mockData.missingCalories}
                </Text>
                <Text style={styles.kcalDescribe}>KCal Restante</Text>
              </>
            );
          }}
        </AnimatedCircularProgress>
        <View style={styles.resumeItem}>
          <Text style={styles.resumeItemTitle}>{mockData.burntCalories}</Text>
          <Text style={styles.resumeItemDescription}>Gastas</Text>
        </View>
      </View>
      <View style={styles.progressBars}>
        <ProgressBar
          label="Carboidratos"
          current={mockData.carbs.eaten}
          total={mockData.carbs.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <ProgressBar
          label="Proteínas"
          current={mockData.proteins.eaten}
          total={mockData.proteins.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <ProgressBar
          label="Gordura"
          current={mockData.fats.eaten}
          total={mockData.fats.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
      </View>
      <View style={styles.calItem}>
        <CupSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Café da Manhã"
          current={mockData.breakfast.eaten}
          total={mockData.breakfast.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <LunchSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Almoço"
          current={mockData.lunch.eaten}
          total={mockData.lunch.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <DinnerSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Jantar"
          current={mockData.dinner.eaten}
          total={mockData.dinner.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <AddButtonSVG width={50} height={50} />
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <SnackSVG color={colors.BACKGROUND_YELLOW} width={45} height={45} />
        <KCalProgressBar
          label="Lanches"
          current={mockData.lunches.eaten}
          total={mockData.lunches.necessary}
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
