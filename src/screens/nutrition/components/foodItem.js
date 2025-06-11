import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LunchSVG } from "../../../constants/svgs";
import * as colors from "../../../constants/colors";
import TrashIcon from "../../../../assets/icons/trashIcon";
import FloatingLabelInput from "../../../components/floatingLabelInput";
import { useAtom } from "jotai";
import { mealFoodListAtom } from "../../../jotai/store";

const FoodItem = ({ name, amount, onDelete, listIndex }) => {
  const [mealFoodList, setMealFoodList] = useAtom(mealFoodListAtom);

  function handleEditQuantity(text) {
    const numericText = text.replace(/[^0-9]/g, "");

    const updatedList = [...mealFoodList];
    const updatedFood = { ...updatedList[listIndex], quantity: numericText };

    updatedList[listIndex] = updatedFood;
    setMealFoodList(updatedList);
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <LunchSVG color={colors.BACKGROUND_YELLOW} width={25} height={25} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
      <FloatingLabelInput
        label="Quantidade"
        color={colors.BACKGROUND_RED}
        value={mealFoodList[listIndex]?.quantity?.toString() || ""}
        setValueFunction={handleEditQuantity}
        smallTextFontSize={8}
        width={50}
      />
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default FoodItem;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: colors.WHITE_ISH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
    padding: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E25C6B",
    marginHorizontal: 16,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    padding: 5,
  },
  textContainer: {
    marginLeft: 15,
  },
  name: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "#000",
  },
  amount: {
    fontSize: 12,
    color: "#6B6B6B",
  },
  deleteButton: {
    backgroundColor: "#E25C6B",
    borderRadius: 999,
  },
});
