import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorage = {
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

export { asyncStorage };
