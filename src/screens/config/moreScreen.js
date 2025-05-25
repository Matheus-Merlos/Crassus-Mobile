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
      screenPercentage={83}
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
          <Text style={styles.optionText}>Meu Perfil</Text>
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
            <Path d="M2.21232 14.0601C1.91928 12.6755 1.93115 11.2743 2.21316 9.94038C3.32308 10.0711 4.29187 9.7035 4.60865 8.93871C4.92544 8.17392 4.50032 7.22896 3.62307 6.53655C4.3669 5.3939 5.34931 4.39471 6.53554 3.62289C7.228 4.50059 8.17324 4.92601 8.93822 4.60914C9.7032 4.29227 10.0708 3.32308 9.93979 2.21281C11.3243 1.91977 12.7255 1.93164 14.0595 2.21364C13.9288 3.32356 14.2964 4.29235 15.0612 4.60914C15.8259 4.92593 16.7709 4.5008 17.4633 3.62356C18.606 4.36739 19.6052 5.3498 20.377 6.53602C19.4993 7.22849 19.0739 8.17373 19.3907 8.93871C19.7076 9.70369 20.6768 10.0713 21.7871 9.94028C22.0801 11.3248 22.0682 12.726 21.7862 14.06C20.6763 13.9293 19.7075 14.2969 19.3907 15.0616C19.0739 15.8264 19.4991 16.7714 20.3763 17.4638C19.6325 18.6064 18.6501 19.6056 17.4638 20.3775C16.7714 19.4998 15.8261 19.0743 15.0612 19.3912C14.2962 19.7081 13.9286 20.6773 14.0596 21.7875C12.675 22.0806 11.2738 22.0687 9.93989 21.7867C10.0706 20.6768 9.70301 19.708 8.93822 19.3912C8.17343 19.0744 7.22848 19.4995 6.53606 20.3768C5.39341 19.633 4.39422 18.6506 3.62241 17.4643C4.5001 16.7719 4.92552 15.8266 4.60865 15.0616C4.29179 14.2967 3.32259 13.9291 2.21232 14.0601ZM3.99975 12.2104C5.09956 12.5148 6.00718 13.2117 6.45641 14.2963C6.90564 15.3808 6.75667 16.5154 6.19421 17.5083C6.29077 17.61 6.38998 17.7092 6.49173 17.8056C7.4846 17.2432 8.61912 17.0943 9.70359 17.5435C10.7881 17.9927 11.485 18.9002 11.7894 19.9999C11.9295 20.0037 12.0697 20.0038 12.2099 20.0001C12.5143 18.9003 13.2112 17.9927 14.2958 17.5435C15.3803 17.0942 16.5149 17.2432 17.5078 17.8057C17.6096 17.7091 17.7087 17.6099 17.8051 17.5081C17.2427 16.5153 17.0938 15.3807 17.543 14.2963C17.9922 13.2118 18.8997 12.5149 19.9994 12.2105C20.0032 12.0704 20.0033 11.9301 19.9996 11.7899C18.8998 11.4856 17.9922 10.7886 17.543 9.70407C17.0937 8.61953 17.2427 7.48494 17.8052 6.49204C17.7086 6.39031 17.6094 6.2912 17.5076 6.19479C16.5148 6.75717 15.3803 6.9061 14.2958 6.4569C13.2113 6.0077 12.5144 5.10016 12.21 4.00044C12.0699 3.99666 11.9297 3.99659 11.7894 4.00024C11.4851 5.10005 10.7881 6.00767 9.70359 6.4569C8.61904 6.90613 7.48446 6.75715 6.49155 6.1947C6.38982 6.29126 6.29071 6.39047 6.19431 6.49222C6.75668 7.48509 6.90561 8.61961 6.45641 9.70407C6.00721 10.7885 5.09967 11.4855 3.99995 11.7899C3.99617 11.93 3.9961 12.0702 3.99975 12.2104ZM11.9997 15.0002C10.3428 15.0002 8.99969 13.657 8.99969 12.0002C8.99969 10.3433 10.3428 9.00018 11.9997 9.00018C13.6565 9.00018 14.9997 10.3433 14.9997 12.0002C14.9997 13.657 13.6565 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z" />{" "}
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
            <Path d="M12.1715 10.9999L7.51457 6.34305L8.92878 4.92883L15.9999 11.9999L8.92878 19.071L7.51457 17.6568L12.1714 12.9999L2.9996 13L2.99957 11L12.1715 10.9999ZM17.9996 18.9998L17.9996 4.99985H19.9996L19.9996 18.9998H17.9996Z" />{" "}
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
