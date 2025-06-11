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
import {
  mealFoodListAtom,
  isLoadingAtom,
  mealTypeToAddAtom,
  isEditingMealAtom,
  mealIdToEditAtom,
  mealNameToEditAtom,
} from "../../jotai/store";
import { idAtom } from "../../jotai/asyncStore";
import { useMemo } from "react";
import BackButton from "../../components/backButton";
import axios from "../../utils/axios";
import Toast from "react-native-toast-message";

export default function AddMealScreen() {
  function sumObjectKey(list, key) {
    if (!list) return 0;

    return list.reduce((total, item) => {
      const value = Number(item[key]) || 0;
      return total + value;
    }, 0);
  }

  const now = new Date();

  const [mealType] = useAtom(mealTypeToAddAtom);
  const mealTypes = {
    1: "Café da Manhã",
    2: "Almoço",
    3: "Janta",
    4: "Lanche",
  };

  const navigation = useNavigation();

  const [mealFoodList, setMealFoodList] = useAtom(mealFoodListAtom);
  const [mealTypeToAdd] = useAtom(mealTypeToAddAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [userId] = useAtom(idAtom);

  const [isEditingMeal, setIsEditingMeal] = useAtom(isEditingMealAtom);
  const [mealIdToEdit, setMealIdToEdit] = useAtom(mealIdToEditAtom);
  const [mealNameToEdit, setMealNameToEdit] = useAtom(mealNameToEditAtom);

  const title =
    isEditingMeal === false
      ? `${mealTypes[mealType]} ${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}`
      : mealNameToEdit;

  const calories = useMemo(
    () => sumObjectKey(mealFoodList, "calories").toFixed(0),
    [mealFoodList],
  );
  const carbs = useMemo(
    () => sumObjectKey(mealFoodList, "carbs").toFixed(2),
    [mealFoodList],
  );
  const proteins = useMemo(
    () => sumObjectKey(mealFoodList, "proteins").toFixed(2),
    [mealFoodList],
  );
  const fats = useMemo(
    () => sumObjectKey(mealFoodList, "fats").toFixed(2),
    [mealFoodList],
  );

  function handleGoBack() {
    //Limpa a lista para ela não ficar salva misteriosamente
    setMealFoodList([]);
    setIsEditingMeal(false);
    setMealIdToEdit(0);
    setMealNameToEdit("");
    navigation.goBack();
  }

  function handleFoodRemoval(foodIndex) {
    const newList = mealFoodList.filter((item, index) => index !== foodIndex);

    setMealFoodList(newList);
  }

  async function handleSubmit() {
    if (!isEditingMeal) {
      if (mealFoodList.length === 0) {
        return;
      }

      setIsLoading(true);
      const requestFoodList = mealFoodList.map((food) => {
        return {
          foodId: food.id,
          grams: food.quantity,
        };
      });

      const requestData = {
        type: mealTypeToAdd,
        foods: requestFoodList,
      };

      try {
        await axios.post(`meals/${userId}`, requestData);

        Toast.show({
          type: "success",
          text1: "Refeição adicionada com sucesso",
        });
        setMealFoodList([]);
        navigation.navigate(screens.NUTRITION);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (mealFoodList.length === 0) {
        return;
      }

      setIsLoading(true);
      const requestFoodList = mealFoodList.map((food) => {
        return {
          foodId: food.id,
          grams: food.quantity,
        };
      });

      const requestData = {
        type: mealTypeToAdd,
        foods: requestFoodList,
      };

      try {
        await axios.patch(`meals/${userId}/${mealIdToEdit}`, requestData);

        Toast.show({
          type: "success",
          text1: "Refeição editada com sucesso",
        });
        setMealFoodList([]);
        setIsEditingMeal(false);
        setMealIdToEdit(0);
        setMealNameToEdit("");
        navigation.navigate(screens.NUTRITION);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <BackButton
        color={colors.WHITE}
        style={{ top: 57, left: 15 }}
        action={handleGoBack}
      />
      <WhiteIshBackground screenPercentage={80} paddingTop={50}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.timestamp}>
              Hoje -{" "}
              {`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`}
            </Text>
          </View>
          <View style={styles.titleAndEditRow}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.editButton}>
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
          data={mealFoodList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <FoodItem
              name={item.name}
              amount={`${item.quantity} gramas`}
              onDelete={() => handleFoodRemoval(index)}
            />
          )}
          contentContainerStyle={styles.foodListContent}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
          <ConfirmIcon />
        </TouchableOpacity>
        <CrassusButton
          text="Adicionar"
          color={colors.SMOOTH_YELLOW}
          style={styles.crassusButton}
          onPress={() => navigation.navigate(screens.SEARCH_FOOD)}
        />
      </WhiteIshBackground>
    </>
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
    marginTop: -25,
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
