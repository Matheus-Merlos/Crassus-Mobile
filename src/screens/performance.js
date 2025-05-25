import { StyleSheet, Text, View } from "react-native";
import WhiteIshBackground from "../components/whiteIshBackground";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ProgressBar from "../components/progressBar";
import * as colors from "../constants/colors";
import Svg, { Circle, Path } from "react-native-svg";
import KCalProgressBar from "../components/calProgressBar";

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
      screenPercentage={83}
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
        <Svg width={45} height={45} viewBox="0 0 100 100" fill="none">
          <Path
            d="M70 55.5556V11.1111H20V55.5556C20 61.6922 24.4771 66.6667 30 66.6667H60C65.523 66.6667 70 61.6922 70 55.5556ZM15 0H90C95.523 0 100 4.97461 100 11.1111V27.7778C100 33.9143 95.523 38.8889 90 38.8889H80V55.5556C80 67.8283 71.0455 77.7778 60 77.7778H30C18.9543 77.7778 10 67.8283 10 55.5556V5.55556C10 2.48733 12.2386 0 15 0ZM80 11.1111V27.7778H90V11.1111H80ZM0 88.8889H90V100H0V88.8889Z"
            fill={colors.BACKGROUND_YELLOW}
          />
        </Svg>
        <KCalProgressBar
          label="Café da Manhã"
          current={mockData.breakfast.eaten}
          total={mockData.breakfast.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <Svg width={50} height={50} viewBox="0 0 125 125" fill="none">
          <Circle cx="62.5" cy="62.5" r="62.5" fill="#F22E52" />
          <Path
            d="M79.3255 66.12H67.2295V78.536H58.7815V66.12H46.6855V58.312H58.7815V45.896H67.2295V58.312H79.3255V66.12Z"
            fill="white"
          />
        </Svg>
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <Svg width={45} height={45} viewBox="0 0 76 84" fill="none">
          <Path
            d="M75.5 0.333496V83.6668H67.1667V54.5002H50.5V25.3335C50.5 11.5264 61.6929 0.333496 75.5 0.333496ZM67.1667 10.8752C63.7083 12.8335 58.8333 17.7085 58.8333 25.3335V46.1668H67.1667V10.8752ZM25.5 49.9168V83.6668H17.1667V49.9168C7.65733 47.9864 0.5 39.5793 0.5 29.5002V4.50016H8.83333V33.6668H17.1667V4.50016H25.5V33.6668H33.8333V4.50016H42.1667V29.5002C42.1667 39.5793 35.0092 47.9864 25.5 49.9168Z"
            fill={colors.BACKGROUND_YELLOW}
          />
        </Svg>
        <KCalProgressBar
          label="Almoço"
          current={mockData.lunch.eaten}
          total={mockData.lunch.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <Svg width={50} height={50} viewBox="0 0 125 125" fill="none">
          <Circle cx="62.5" cy="62.5" r="62.5" fill="#F22E52" />
          <Path
            d="M79.3255 66.12H67.2295V78.536H58.7815V66.12H46.6855V58.312H58.7815V45.896H67.2295V58.312H79.3255V66.12Z"
            fill="white"
          />
        </Svg>
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <Svg width={45} height={45} viewBox="0 0 84 86" fill="none">
          <Path
            d="M25.3333 4.25016C25.3333 1.94898 23.4678 0.0834961 21.1667 0.0834961C18.8655 0.0834961 17 1.94898 17 4.25016V8.41683C17 8.44541 17.0018 8.47037 17.0034 8.49362C17.016 8.67487 17.0215 8.75279 16.137 9.6372L16.0532 9.72091C14.9416 10.8298 12.8333 12.9331 12.8333 16.7502V20.9168C12.8333 23.218 14.6988 25.0835 17 25.0835C19.3012 25.0835 21.1667 23.218 21.1667 20.9168V16.7502C21.1667 16.7216 21.1649 16.6966 21.1633 16.6734C21.1506 16.4921 21.1452 16.4142 22.0296 15.5298L22.1135 15.4461C23.225 14.3372 25.3333 12.2339 25.3333 8.41683V4.25016ZM71.1667 4.25016C71.1667 1.94898 69.3013 0.0834961 67 0.0834961C64.6988 0.0834961 62.8333 1.94898 62.8333 4.25016V8.41683C62.8333 8.44541 62.835 8.47037 62.8367 8.49362C62.8492 8.67487 62.855 8.75279 61.9704 9.6372L61.8867 9.72091C60.775 10.8298 58.6667 12.9331 58.6667 16.7502V20.9168C58.6667 23.218 60.5321 25.0835 62.8333 25.0835C65.1346 25.0835 67 23.218 67 20.9168V16.7502C67 16.7216 66.9983 16.6966 66.9967 16.6734C66.9842 16.4921 66.9783 16.4142 67.8629 15.5298L67.9467 15.4461C69.0583 14.3372 71.1667 12.2339 71.1667 8.41683V4.25016ZM44.0833 0.0834961C46.3846 0.0834961 48.25 1.94898 48.25 4.25016V8.41683C48.25 12.2339 46.1417 14.3372 45.03 15.4461L44.9463 15.5298C44.0617 16.4142 44.0675 16.4921 44.08 16.6734C44.0817 16.6966 44.0833 16.7216 44.0833 16.7502V20.9168C44.0833 23.218 42.2179 25.0835 39.9167 25.0835C37.6154 25.0835 35.75 23.218 35.75 20.9168V16.7502C35.75 12.9331 37.8583 10.8298 38.97 9.72091L39.0538 9.6372C39.9383 8.75279 39.9325 8.67487 39.92 8.49362C39.9183 8.47037 39.9167 8.44541 39.9167 8.41683V4.25016C39.9167 1.94898 41.7821 0.0834961 44.0833 0.0834961ZM8.66667 39.6668H75.3333C75.3333 58.0764 60.4096 73.0002 42 73.0002C23.5905 73.0002 8.66667 58.0764 8.66667 39.6668ZM4.5 31.3335C2.19884 31.3335 0.333336 33.199 0.333336 35.5002V39.6668C0.333336 56.7527 10.6175 71.4368 25.3333 77.8664V81.3335C25.3333 83.6347 27.1988 85.5002 29.5 85.5002H54.5C56.8013 85.5002 58.6667 83.6347 58.6667 81.3335V77.8664C73.3825 71.4368 83.6667 56.7527 83.6667 39.6668V35.5002C83.6667 33.199 81.8013 31.3335 79.5 31.3335H4.5Z"
            fill={colors.BACKGROUND_YELLOW}
          />
        </Svg>
        <KCalProgressBar
          label="Jantar"
          current={mockData.dinner.eaten}
          total={mockData.dinner.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <Svg width={50} height={50} viewBox="0 0 125 125" fill="none">
          <Circle cx="62.5" cy="62.5" r="62.5" fill="#F22E52" />
          <Path
            d="M79.3255 66.12H67.2295V78.536H58.7815V66.12H46.6855V58.312H58.7815V45.896H67.2295V58.312H79.3255V66.12Z"
            fill="white"
          />
        </Svg>
      </View>
      <View style={styles.hr} />
      <View style={styles.calItem}>
        <Svg width={45} height={(45 * 80) / 92} viewBox="0 0 92 80" fill="none">
          <Path
            d="M16.8333 0.5C7.62858 0.5 0.166664 7.96192 0.166664 17.1667C0.166664 23.3403 3.52166 28.7226 8.5 31.6025V67.1667C8.5 74.0704 14.0965 79.6667 21 79.6667H71C77.9037 79.6667 83.5 74.0704 83.5 67.1667V31.6025C88.4783 28.7226 91.8333 23.3403 91.8333 17.1667C91.8333 7.96192 84.3712 0.5 75.1667 0.5H16.8333ZM25.1667 71.3333C22.8655 71.3333 21 69.4679 21 67.1667V26.0088L18.2219 25.0269C14.9796 23.8809 12.6667 20.7885 12.6667 17.1667C12.6667 12.5643 16.3976 8.83333 21 8.83333H75.1667C79.7692 8.83333 83.5 12.5643 83.5 17.1667C83.5 20.7885 81.1871 23.8809 77.945 25.0269L75.1667 26.0088V67.1667C75.1667 69.4679 73.3012 71.3333 71 71.3333H25.1667Z"
            fill={colors.BACKGROUND_YELLOW}
          />
        </Svg>
        <KCalProgressBar
          label="Lanches"
          current={mockData.lunches.eaten}
          total={mockData.lunches.necessary}
          color={colors.BACKGROUND_YELLOW}
        />
        <Svg width={50} height={50} viewBox="0 0 125 125" fill="none">
          <Circle cx="62.5" cy="62.5" r="62.5" fill="#F22E52" />
          <Path
            d="M79.3255 66.12H67.2295V78.536H58.7815V66.12H46.6855V58.312H58.7815V45.896H67.2295V58.312H79.3255V66.12Z"
            fill="white"
          />
        </Svg>
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
