import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../jotai/asyncStore";

export default function AppNavigator() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
