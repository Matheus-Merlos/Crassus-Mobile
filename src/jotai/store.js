import { atom } from "jotai";

const isLoadingAtom = atom(false);
const mealTypeToAddAtom = atom(1);
const mealFoodListAtom = atom([]);

export { isLoadingAtom, mealFoodListAtom, mealTypeToAddAtom };
