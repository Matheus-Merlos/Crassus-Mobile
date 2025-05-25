import { View, Text, StyleSheet, Dimensions } from "react-native";
import MealItem from "./mealItem";
import * as colors from "../../../constants/colors";

export default function MealDay({ date, meals }) {
  return (
    <View style={styles.mealDay}>
      <Text style={styles.mealDate}>{date}</Text>
      {meals.map((meal, index) => (
        <MealItem
          key={index}
          name={meal.name}
          calories={meal.calories}
          iconIndex={1}
        />
      ))}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mealDay: {
    width: width,
    backgroundColor: colors.WHITE_ISH,
    padding: 15,
    marginBottom: 20,
  },
  mealDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.BACKGROUND_YELLOW,
    marginBottom: 10,
  },
});
