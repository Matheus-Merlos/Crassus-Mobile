import { Button, Image, Text, View, StyleSheet } from "react-native";
import crassusIcon from '../../assets/icons/crassus-icon.png';

export default function WelcomeScreen() {
  return (
    <View>
      <Image source={crassusIcon} style={styles.icon}></Image>
      <Text>Crassus</Text>
      <Button title="Fazer Login" />
      <Button title="Cadastrar-se" />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    width: 200,
    height: 200
  }
})
