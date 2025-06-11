import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import MealItem from "./mealItem";
import * as colors from "../../../constants/colors";

export default function MealDay({ date, meals = [] }) {
  return (
    <View style={styles.mealDay}>
      <Text style={styles.mealDate}>{date}</Text>
      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <MealItem
            key={index}
            itemKey={item.id}
            name={item.name}
            calories={item.calories}
            mealType={item.mealTypeId}
          />
        )}
      />
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
    marginTop: 5,
  },
  mealDate: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.BACKGROUND_YELLOW,
    marginBottom: 10,
  },
});
