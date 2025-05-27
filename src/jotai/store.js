import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage } from "jotai/utils";

const storage = {
  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

export const isLoggedInAtom = atomWithStorage("is_logged_in", false, storage);
export const idAtom = atomWithStorage("id", null, storage);
export const nameAtom = atomWithStorage("name", null, storage);
export const emailAtom = atomWithStorage("email", null, storage);
export const tokenAtom = atomWithStorage("token", null, storage);
