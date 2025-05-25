import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WhiteIshBackground from "../../components/whiteIshBackground";
import * as colors from "../../constants/colors";
import Svg, { Path } from "react-native-svg";

export default function MoreScreen() {
  const mockUser = {
    name: "John Doe",
    email: "text@example.com",
  };
  return (
    <WhiteIshBackground
      title="Seu Perfil"
      titleDistanceToTop={75}
      screenPercentage={75}
    >
      <View style={styles.userIcon}>
        <Svg
          width={100}
          height={100}
          viewBox="0 0 24 24"
          fill={colors.BACKGROUND_YELLOW}
        >
          <Path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
        </Svg>
      </View>
      <Text style={styles.userTitle}>Olá, {mockUser.name}!</Text>
      <Text style={styles.userEmail}>{mockUser.email}</Text>
      <TouchableOpacity style={styles.option}>
        <View style={styles.optionTextIcon}>
          <Svg
            width={50}
            height={50}
            viewBox="0 0 24 24"
            fill={colors.BACKGROUND_YELLOW}
          >
            <Path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
          </Svg>
          <Text style={styles.optionText}>Configurações</Text>
        </View>
        <Svg
          width={50}
          height={50}
          viewBox="0 0 24 24"
          fill={colors.SMOOTH_YELLOW}
          style={{ opacity: 0.75 }}
        >
          <Path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <View style={styles.optionTextIcon}>
          <Svg
            width={50}
            height={50}
            viewBox="0 0 24 24"
            fill={colors.BACKGROUND_YELLOW}
          >
            <Path d="M12.1715 10.9999L7.51457 6.34305L8.92878 4.92883L15.9999 11.9999L8.92878 19.071L7.51457 17.6568L12.1714 12.9999L2.9996 13L2.99957 11L12.1715 10.9999ZM17.9996 18.9998L17.9996 4.99985H19.9996L19.9996 18.9998H17.9996Z" />
          </Svg>
          <Text style={styles.optionText}>Desconectar</Text>
        </View>
        <Svg
          width={50}
          height={50}
          viewBox="0 0 24 24"
          fill={colors.SMOOTH_YELLOW}
          style={{ opacity: 0.75 }}
        >
          <Path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
        </Svg>
      </TouchableOpacity>
    </WhiteIshBackground>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    width: 175,
    height: 175,
    borderColor: colors.BACKGROUND_YELLOW,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
  },
  userTitle: {
    fontFamily: "Poppins-SemiBold",
    marginTop: 12,
    fontSize: 26,
  },
  userEmail: {
    fontFamily: "Poppins-Regular",
    opacity: 0.5,
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    justifyContent: "space-between",
    marginTop: 30,
  },
  optionTextIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: 175,
    gap: 20,
  },
  optionText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    opacity: 0.75,
  },
});
