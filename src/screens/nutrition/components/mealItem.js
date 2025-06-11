import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditIcon from "../../../../assets/icons/editIcon";
import * as colors from "../../../constants/colors";
import { CupSVG, DinnerSVG, LunchSVG, SnackSVG } from "../../../constants/svgs";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../../../constants/screens";
import { useAtom } from "jotai";
import {
  isEditingMealAtom,
  isLoadingAtom,
  mealFoodListAtom,
  mealIdToEditAtom,
  mealNameToEditAtom,
  mealTypeToAddAtom,
} from "../../../jotai/store";
import { idAtom } from "../../../jotai/asyncStore";
import axios from "../../../utils/axios";

export default function MealItem({ itemKey, name, calories, mealType }) {
  const icons = {
    1: <CupSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
    2: <LunchSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
    3: <DinnerSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
    4: <SnackSVG width={32} height={32} color={colors.BACKGROUND_YELLOW} />,
  };

  const navigation = useNavigation();

  const [userId] = useAtom(idAtom);
  const [, setMealTypeToAdd] = useAtom(mealTypeToAddAtom);
  const [, setMealFoodList] = useAtom(mealFoodListAtom);
  const [, setIsEditingMeal] = useAtom(isEditingMealAtom);
  const [, setMealIdToEdit] = useAtom(mealIdToEditAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [, setMealNameToEdit] = useAtom(mealNameToEditAtom);

  async function handleMealEdit() {
    try {
      setIsLoading(true);

      const response = await axios.get(`meals/${userId}/${itemKey}`);

      setMealTypeToAdd(mealType);
      setMealFoodList(response.data.foods);
      setIsEditingMeal(true);
      setMealIdToEdit(itemKey);
      setMealNameToEdit(name);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }

    navigation.navigate(screens.ADDMEAL);
  }

  return (
    <View style={styles.container}>
      {icons[mealType]}

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.calories}>{calories} calories</Text>
      </View>
      <TouchableOpacity onPress={handleMealEdit}>
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
