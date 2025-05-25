import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions, View } from "react-native";
import * as colors from "../../constants/colors";
import MealDay from "./components/mealDay";
import CrassusButton from "../../components/crassusButton";
import WhiteIshBackground from "../../components/whiteIshBackground";

export default function NutritionScreen() {
  const navigation = useNavigation();
  const mockMeals = [
    {
      date: "17/04/2025",
      meals: [
        { name: "Jantar 1", calories: 379 },
        { name: "Almoço 1", calories: 856 },
        { name: "Café da Manhã 1", calories: 76 },
      ],
    },
    {
      date: "16/04/2025",
      meals: [
        { name: "Jantar 1", calories: 721 },
        { name: "Almoço 1", calories: 1152 },
        { name: "Café da Manhã 1", calories: 76 },
      ],
    },
    {
      date: "16/04/2025",
      meals: [
        { name: "Jantar 1", calories: 721 },
        { name: "Almoço 1", calories: 1152 },
        { name: "Café da Manhã 1", calories: 76 },
      ],
    },
    {
      date: "16/04/2025",
      meals: [
        { name: "Jantar 1", calories: 721 },
        { name: "Almoço 1", calories: 1152 },
        { name: "Café da Manhã 1", calories: 76 },
      ],
    },
  ];

  const handleNewMeal = () => {
    //navigation.navigate("AddMeal");
  };

  return (
    <>
      <WhiteIshBackground
        title="Suas Refeições"
        titleDistanceToTop={75}
        screenPercentage={75}
        paddingTop={25}
        isScroll
      >
        {mockMeals.map((day, index) => (
          <MealDay key={index} date={day.date} meals={day.meals} />
        ))}
      </WhiteIshBackground>
      <View style={styles.button}>
        <CrassusButton
          text="Nova refeição"
          color={colors.BACKGROUND_YELLOW}
          style={styles.addButton}
          onPress={handleNewMeal}
        />
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#fbbc05",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: width * 0.6,
  },
  button: {
    position: "absolute",
    height: 150,
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE_ISH,
    bottom: 0,
  },
});
