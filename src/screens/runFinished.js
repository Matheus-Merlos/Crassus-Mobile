import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as colors from '../constants/colors';
import RunIcon from '../../assets/icons/runIcon';

const { width, height } = Dimensions.get('window');

export default function RunFinishedScreen() {
  const data = {
    title: 'Corrida 98',
    datetime: 'Hoje - 9:51 AM',
    distance: 2.41,
    pace: "8’21”",
    time: '9:31',
    calories: 221,
    elevation: '721m',
    bpmMax: 157,
  };

  return (
    <View style={styles.container}>
      {/* Gradiente topo */}
      <LinearGradient
        colors={[colors.BACKGROUND_RED, colors.BACKGROUND_YELLOW]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 220 }}>
        <Text style={styles.datetime}>{data.datetime}</Text>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.iconFrame}>
            <RunIcon size={48} color="#000" />
          </View>
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.distance}>{data.distance.toFixed(2)}</Text>
          <Text style={styles.distanceLabel}>Quilômetros</Text>

          <View style={styles.metricsRow}>
            <Metric label="Pace Médio" value={data.pace} />
            <Metric label="Tempo" value={data.time} />
            <Metric label="Calorias" value={data.calories.toString()} />
          </View>

          <View style={styles.metricsRow}>
            <Metric label="Elevação" value={data.elevation} />
            <Metric label="BPM Máximo" value={data.bpmMax.toString()} />
          </View>
        </View>

        <Image
          source={require('../../assets/mockMap.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </ScrollView>
    </View>
  );
}

const Metric = ({ label, value }) => (
  <View style={styles.metricBlock}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  gradient: {
    position: 'absolute',
    width,
    height,
  },
  datetime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 32,
    marginLeft: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 4,
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    color: 'rgba(0,0,0,0.9)',
  },
  iconFrame: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteCard: {
    backgroundColor: colors.WHITE_ISH,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  distance: {
    fontFamily: 'Poppins-BlackItalic',
    fontSize: 64,
    textAlign: 'center',
    color: '#000',
  },
  distanceLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  metricBlock: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    color: '#000',
  },
  metricLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 4,
    textAlign: 'center',
  },
  mapImage: {
    width,
    height: height * 0.35,
    marginTop: 16,
  },
});
