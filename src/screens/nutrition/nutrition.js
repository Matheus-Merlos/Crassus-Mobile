import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView, StyleSheet, Dimensions, View } from "react-native";
import * as colors from "../../constants/colors";
import MealDay from "./components/mealDay";
import CrassusButton from "../../components/crassusButton";

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
    navigation.navigate("AddMeal");
  };

  return (
    <>
      <Text style={styles.title}>Suas Refeições</Text>
      <ScrollView contentContainerStyle={styles.background}>
        {mockMeals.map((day, index) => (
          <MealDay key={index} date={day.date} meals={day.meals} />
        ))}
      </ScrollView>
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    fontFamily: "PublicSans-Bold",
    color: colors.WHITE,
    fontSize: 40,
    left: 30,
    top: 80,
  },
  background: {
    marginTop: 150,
    position: "absolute",
    width,
    height: height * 0.8,
    top: 20,
    backgroundColor: colors.WHITE_ISH,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#fbbc05",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: width * 0.6,
  },
  button: {
    height: 150,
    justifyContent: "center",
    backgroundColor: colors.WHITE_ISH,
  },
});
