import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import { useAtom } from "jotai";

export default function AppNavigator() {
  const [isLoggedIn] = useAtom(isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
