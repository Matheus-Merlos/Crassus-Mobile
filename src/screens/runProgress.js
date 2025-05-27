import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as colors from '../constants/colors';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.35;

export default function RunProgressScreen() {
  const navigation = useNavigation();

  const pace = '8’21”';
  const time = '9:31';
  const calories = 221;
  const distance = 2.41;

  /** Encerrar corrida → tela finalizada */
  const handlePause = () => {
    navigation.replace('RunFinished');
  };

  return (
    <View style={styles.container}>
      {/* Gradiente superior */}
      <LinearGradient
        colors={[colors.BACKGROUND_YELLOW, colors.BACKGROUND_RED]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerBg}
      />

      {/* Métricas */}
      <View style={styles.metricsRow}>
        <Metric title="Pace Médio" value={pace} />
        <Metric title="Tempo" value={time} />
        <Metric title="Calorias" value={calories.toString()} />
      </View>

      {/* Distância + botão pausa */}
      <View style={styles.distanceBlock}>
        <Text style={styles.distance}>{distance.toFixed(2)}</Text>
        <Text style={styles.distanceLabel}>Quilômetros</Text>
        <TouchableOpacity style={styles.pauseBtn} onPress={handlePause}>
          <Text style={styles.pauseTxt}>II</Text>
        </TouchableOpacity>
      </View>

      {/* Mapa */}
      <Image
        source={require('../../assets/mockMap.png')}
        style={styles.map}
        resizeMode="cover"
      />
    </View>
  );
}

const Metric = ({ title, value }) => (
  <View style={styles.metricBlock}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE, // <-— usou constante
  },
  headerBg: {
    position: 'absolute',
    width,
    height: HEADER_HEIGHT,
    top: 0,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60,
  },
  metricBlock: { alignItems: 'center' },
  metricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 36,
    color: '#000',
  },
  metricTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'rgba(0,0,0,0.6)',
  },
  distanceBlock: {
    position: 'absolute',
    top: HEADER_HEIGHT - 100,
    alignSelf: 'center',
    width: width * 0.7,
    alignItems: 'center',
  },
  distance: {
    fontFamily: 'Poppins-BlackItalic',
    fontSize: 48,
    color: '#000',
  },
  distanceLabel: {
    fontFamily: 'Poppins-BlackItalic',
    fontSize: 20,
    color: 'rgba(0,0,0,0.6)',
  },
  pauseBtn: {
    marginTop: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000', // preto mantido (não há constante)
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseTxt: { color: colors.WHITE, fontSize: 22 }, // texto em branco usando constante
  map: {
    position: 'absolute',
    top: HEADER_HEIGHT + 80,
    width,
    height: height - (HEADER_HEIGHT + 80),
  },
});
