import { useEffect, useMemo, useState } from "react";
import axios from "../../utils/axios";
import FloatingLabelInput from "../../components/floatingLabelInput";
import * as colors from "../../constants/colors";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import WhiteIshBackground from "../../components/whiteIshBackground";
import { LunchSVG } from "../../constants/svgs";
import { useAtom } from "jotai";
import { mealFoodListAtom } from "../../jotai/store";
import { useNavigation } from "@react-navigation/native";
import * as screens from "../../constants/screens";

export default function SearchMeal() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();

  const [mealFoodList, setMealFoodList] = useAtom(mealFoodListAtom);

  const formattedSearchTerm = useMemo(() => {
    return searchTerm.replaceAll(" ", "+");
  }, [searchTerm]);

  useEffect(() => {
    async function fetchFoods(searchTerm = "") {
      const response = await axios.get(`foods?q=${formattedSearchTerm}`);

      setFoods(response.data);
    }

    fetchFoods();
  }, [formattedSearchTerm]);

  function handleFoodAdd(food, quantity = 100) {
    const foodWithQuantity = { ...food, quantity };
    const newMealFoodList = [...mealFoodList, foodWithQuantity];
    setMealFoodList(newMealFoodList);

    navigation.goBack();
  }

  return (
    <WhiteIshBackground screenPercentage={85}>
      <FloatingLabelInput
        label="Pesquisar"
        color={colors.BACKGROUND_RED}
        value={searchTerm}
        setValueFunction={setSearchTerm}
      />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => handleFoodAdd(item)}>
              <View style={styles.foodItem}>
                <LunchSVG
                  color={colors.BACKGROUND_YELLOW}
                  width={35}
                  height={35}
                />
                <Text style={styles.label}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.hr} />
          </>
        )}
      />
    </WhiteIshBackground>
  );
}

const styles = StyleSheet.create({
  hr: {
    width: 380,
    backgroundColor: colors.BACKGROUND_RED,
    height: 1,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
});
