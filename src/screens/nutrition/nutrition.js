import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import * as colors from "../../constants/colors";
import MealDay from "./components/mealDay";
import WhiteIshBackground from "../../components/whiteIshBackground";
import * as screens from "../../constants/screens";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isLoadingAtom, mealTypeToAddAtom } from "../../jotai/store";
import axios from "../../utils/axios";
import { idAtom } from "../../jotai/asyncStore";
import { FAB } from "react-native-paper";
import {
  AddButtonSVG,
  CupSVG,
  DinnerSVG,
  LunchSVG,
  SnackSVG,
} from "../../constants/svgs";

export default function NutritionScreen() {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);

  const [meals, setMeals] = useState([]);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [, setMealTypeToAdd] = useAtom(mealTypeToAddAtom);
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

  function handleNewMeal(mealType) {
    setMealTypeToAdd(mealType);
    navigation.navigate(screens.ADDMEAL);
  }

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
      <FAB.Group
        open={open}
        onStateChange={({ open }) => setOpen(open)}
        icon={(props) => (
          <View style={{ zIndex: 999 }}>
            <AddButtonSVG
              width={50}
              height={50}
              color={colors.BACKGROUND_YELLOW}
            />
          </View>
        )}
        actions={[
          {
            icon: (props) => (
              <CupSVG color={colors.BACKGROUND_YELLOW} width={25} height={25} />
            ),
            label: "Café da Manhã",
            onPress: () => handleNewMeal(1),
          },
          {
            icon: (props) => (
              <LunchSVG
                color={colors.BACKGROUND_YELLOW}
                width={25}
                height={25}
              />
            ),
            label: "Almoço",
            onPress: () => handleNewMeal(2),
          },
          {
            icon: (props) => (
              <DinnerSVG
                color={colors.BACKGROUND_YELLOW}
                width={25}
                height={25}
              />
            ),
            label: "Janta",
            onPress: () => handleNewMeal(3),
          },
          {
            icon: (props) => (
              <SnackSVG
                color={colors.BACKGROUND_YELLOW}
                width={25}
                height={25}
              />
            ),
            label: "Lanche",
            onPress: () => handleNewMeal(4),
          },
        ]}
        fabStyle={styles.fabButton}
        style={styles.fab}
        backdropColor="rgba(0,0,0,0.5)"
      />
    </>
  );
}

const styles = StyleSheet.create({
  fabButton: {
    width: 80,
    height: 80,
    backgroundColor: colors.BACKGROUND_YELLOW,
  },
  fab: {
    bottom: 0,
  },
});
