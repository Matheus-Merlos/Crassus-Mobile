import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

export default function (reducers) {
  const persistedReducers = persistReducer(
    { key: "Crassus", storage: AsyncStorage, whitelist: ["login"] },
    reducers,
  );

  return persistedReducers;
}
