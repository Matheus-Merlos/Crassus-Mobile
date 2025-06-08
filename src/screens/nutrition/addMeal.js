import WhiteIshBackground from "../../components/whiteIshBackground";
import * as colors from "../../constants/colors";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditIcon from "../../../assets/icons/editIcon";
import CrassusButton from "../../components/crassusButton";
import FoodItem from "./components/foodItem";
import ConfirmIcon from "../../../assets/icons/confirmIcon";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../../constants/screens";
import { useAtom } from "jotai";
import { mealFoodListAtom } from "../../jotai/store";
import { useMemo } from "react";

const mealData = [
  { id: "1", name: "Peito de Frango", amount: "150 gramas" },
  { id: "2", name: "Arroz Cozido", amount: "150 gramas" },
  { id: "3", name: "Purê de Batata Doce", amount: "100 gramas" },
];

export default function AddMealScreen({
  title = "Almoço 1",
  time = "10:52 AM",
  calories = 1182,
  carbs = 131,
  proteins = 71,
  fats = 41,
  onEdit,
}) {
  const navigation = useNavigation();

  const [mealFoodList, setMealFoodList] = useAtom(mealFoodListAtom);

  console.log(mealFoodList);

  return (
    <WhiteIshBackground screenPercentage={80}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.timestamp}>Hoje - {time}</Text>
        </View>
        <View style={styles.titleAndEditRow}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <EditIcon color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.caloriesValue}>{calories}</Text>
        <Text style={styles.caloriesLabel}>Calorias</Text>

        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{carbs}g</Text>
            <Text style={styles.macroLabel}>Carboidratos</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{proteins}g</Text>
            <Text style={styles.macroLabel}>Proteínas</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{fats}g</Text>
            <Text style={styles.macroLabel}>Gordura</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={mealData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodItem name={item.name} amount={item.amount} />
        )}
        contentContainerStyle={styles.foodListContent}
      />
      <TouchableOpacity style={styles.iconButton}>
        <ConfirmIcon />
      </TouchableOpacity>
      <CrassusButton
        text="Adicionar"
        color={colors.SMOOTH_YELLOW}
        style={styles.crassusButton}
        onPress={() => navigation.navigate(screens.SEARCH_FOOD)}
      />
    </WhiteIshBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: colors.SMOOTH_YELLOW,
    borderRadius: 999,
    padding: 12,
    position: "absolute",
    right: 0,
    bottom: 50,
  },
  crassusButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    marginTop: "auto",
  },
  titleAndEditRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  editButton: {
    padding: 4,
  },
  card: {
    backgroundColor: colors.WHITE_ISH,
    borderRadius: 12,
    padding: 16,
    gap: 4,
    width,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timestamp: {
    marginTop: -30,
    fontSize: 14,
    opacity: 0.5,
  },
  titleRow: {
    marginTop: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  caloriesValue: {
    fontSize: 84,
    fontFamily: "Poppins-BlackItalic",
    color: "#000",
  },
  caloriesLabel: {
    fontSize: 20,
    opacity: 0.5,
    top: 0,
    marginTop: -50,
    padding: 4,
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "#000",
  },
  macroLabel: {
    fontSize: 16,
    opacity: 0.5,
  },
  foodItem: {
    padding: 5,
    height: height * 0.2,
  },
});
