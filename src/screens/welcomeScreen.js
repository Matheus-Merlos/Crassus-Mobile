import { Button, Image, Text, View } from "react-native";
import crassusIcon from '../../assets/icons/crassus-icon.png';

export default function WelcomeScreen() {
  return (
    <View>
      <Image source={crassusIcon}></Image>
      <Text>Crassus</Text>
      <Button title="Fazer Login" />
      <Button title="Cadastrar-se" />
    </View>
  )
}
