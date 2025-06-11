import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditIcon from "../../../../assets/icons/editIcon";
import * as colors from "../../../constants/colors";
import { CupSVG, DinnerSVG, LunchSVG, SnackSVG } from "../../../constants/svgs";

export default function MealItem({ name, calories, iconIndex, mealType }) {
  const icons = {
    1: <CupSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
    2: <LunchSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
    3: <DinnerSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
    4: <SnackSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
  };

  return (
    <View style={styles.container}>
      {icons[mealType]}

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.calories}>{calories} calories</Text>
      </View>
      <TouchableOpacity>
        <EditIcon color={colors.BACKGROUND_RED}></EditIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // fontSize: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.WHITE_ISH,
    padding: 10,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  textContainer: {
    // fontSize: 100,
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 25,
    fontWeight: "600", // semibold
    color: "#1C1C1E",
  },
  calories: {
    fontSize: 16,
    color: "#6B7280", // cinza claro
  },
});
