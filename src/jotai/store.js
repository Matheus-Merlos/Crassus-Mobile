import { atom } from "jotai";

const isLoadingAtom = atom(false);
const mealFoodListAtom = atom([]);

export { isLoadingAtom, mealFoodListAtom };
