import { atom } from "jotai";

const isLoadingAtom = atom(false);
const mealTypeToAddAtom = atom(1);
const mealFoodListAtom = atom([]);
const isEditingMealAtom = atom(false);
const mealIdToEditAtom = atom(0);
const mealNameToEditAtom = atom("");

export {
  isLoadingAtom,
  mealFoodListAtom,
  mealTypeToAddAtom,
  isEditingMealAtom,
  mealIdToEditAtom,
  mealNameToEditAtom,
};
