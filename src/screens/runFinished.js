import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as colors from "../constants/colors";
import RunIcon from "../../assets/icons/runIcon";

const { width, height } = Dimensions.get("window");
const MAP_HEIGHT = height * 0.40;

export default function RunFinishedScreen({ route }) {
  const {
    title = "Minha Corrida",
    datetime = "—",
    totalDistance = 0,
    totalTime = 0,
    pace = "--’--”",
    calories = 0,
    elevation = "—",
    bpmMax = "—",
    path = [],
  } = route.params ?? {};

  const formattedDistance = totalDistance.toFixed(2);

  const formatTime = (secs) => {
    const mm = Math.floor(secs / 60).toString().padStart(2, "0");
    const ss = (secs % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };
  const formattedTime = formatTime(totalTime);

  const startPoint = path.length > 0 ? path[0] : null;
  const endPoint = path.length > 1 ? path[path.length - 1] : null;

  const initialRegion =
    path.length > 0
      ? {
          latitude: path[0].latitude,
          longitude: path[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : {
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.BACKGROUND_RED, colors.BACKGROUND_YELLOW]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.datetime}>{datetime}</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.iconFrame}>
            <RunIcon size={40} color="#000" />
          </View>
        </View>

        <View style={styles.distanceBlock}>
          <Text style={styles.distance}>{formattedDistance}</Text>
          <Text style={styles.distanceLabel}>Quilômetros</Text>
        </View>

        <View style={styles.metricsRow}>
          <Metric label="Pace Médio" value={pace} />
          <Metric label="Tempo" value={formattedTime} />
          <Metric label="Calorias" value={calories.toString()} />
        </View>
        <View style={styles.metricsRow}>
          <Metric label="Elevação" value={elevation.toString()} />
          <Metric label="BPM Máximo" value={bpmMax.toString()} />
        </View>

        <View style={{ height: MAP_HEIGHT * 0.3 }} />
      </ScrollView>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          loadingEnabled
        >
          <Polyline
            coordinates={path.map((p) => ({
              latitude: p.latitude,
              longitude: p.longitude,
            }))}
            strokeWidth={4}
            strokeColor="#FF0000"
          />

          {startPoint && (
            <Marker
              coordinate={{
                latitude: startPoint.latitude,
                longitude: startPoint.longitude,
              }}
              title="Início"
              pinColor="green"
            />
          )}
          {endPoint && (
            <Marker
              coordinate={{
                latitude: endPoint.latitude,
                longitude: endPoint.longitude,
              }}
              title="Fim"
              pinColor="red"
            />
          )}
        </MapView>
      </View>
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
  container: { flex: 1, backgroundColor: colors.WHITE },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: MAP_HEIGHT,
  },
  datetime: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
    marginBottom: 4,
  },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  title: {
    flex: 1,
    fontFamily: "Poppins-SemiBold",
    fontSize: 32,
    color: "rgba(0,0,0,0.9)",
  },
  iconFrame: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  distanceBlock: { alignItems: "center", marginBottom: 24 },
  distance: {
    fontFamily: "Poppins-BlackItalic",
    fontSize: 64,
    color: "#000",
  },
  distanceLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "rgba(0,0,0,0.6)",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  metricBlock: { alignItems: "center", flex: 1 },
  metricValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#000",
  },
  metricLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
    marginTop: 4,
    textAlign: "center",
  },
  mapContainer: {
    position: "absolute",
    bottom: 0,
    width,
    height: MAP_HEIGHT,
    backgroundColor: colors.WHITE,
  },
  map: { flex: 1 },
});
