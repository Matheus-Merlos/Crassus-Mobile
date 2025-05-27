import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";

export default function AppNavigator() {
  const isAuth = true;
  return (
    <NavigationContainer>
      {isAuth ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
