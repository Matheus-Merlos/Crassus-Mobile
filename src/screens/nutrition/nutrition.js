import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions, View, FlatList } from "react-native";
import * as colors from "../../constants/colors";
import MealDay from "./components/mealDay";
import CrassusButton from "../../components/crassusButton";
import WhiteIshBackground from "../../components/whiteIshBackground";
import * as screes from "../../constants/screens";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isLoadingAtom } from "../../jotai/store";
import axios from "../../utils/axios";
import { idAtom } from "../../jotai/asyncStore";

export default function NutritionScreen() {
  const navigation = useNavigation();

  const [meals, setMeals] = useState([]);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [userId] = useAtom(idAtom);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);

      try {
        const response = await axios.get(`meals/${userId}`);

        setMeals(response.data);
      } catch (error) {
        console.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    }
    if (userId) fetchMeals();
  }, [setIsLoading, userId]);

  const handleNewMeal = () => {
    navigation.navigate(screes.ADDMEAL);
  };

  return (
    <>
      <WhiteIshBackground
        title="Suas Refeições"
        titleDistanceToTop={75}
        screenPercentage={75}
        paddingTop={25}
      >
        <FlatList
          data={meals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <MealDay key={index} date={item.date} meals={item.meals} />
          )}
        />
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
