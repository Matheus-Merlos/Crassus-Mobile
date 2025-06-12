import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import haversine from "haversine-distance";
import * as colors from "../constants/colors";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.35;

export default function RunProgressScreen() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(false);
  const [path, setPath] = useState([]);
  const [watcher, setWatcher] = useState(null);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const mapRef = useRef(null);

  const handlePause = () => {
    if (watcher) {
      watcher.remove();
    }
    navigation.replace("RunFinished", {
      totalDistance: distanceMeters / 1000,
      totalTime: elapsedSeconds,
      path,
    });
  };

  async function startLocationUpdates() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à sua localização para registrar a corrida.",
      );
      return;
    }
    setHasPermission(true);

    const now = Date.now();
    setStartTime(now);
    const timerId = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - now) / 1000));
    }, 1000);

    const locWatcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 500,
        distanceInterval: 2,
      },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        setPath((prevPath) => {
          if (prevPath.length > 0) {
            const last = prevPath[prevPath.length - 1];
            const delta = haversine(
              { lat: last.latitude, lon: last.longitude },
              { lat: latitude, lon: longitude },
            );
            setDistanceMeters((d) => d + delta);
          }
          return [
            ...prevPath,
            { latitude, longitude, timestamp: loc.timestamp },
          ];
        });

        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: { latitude, longitude },
          });
        }
      },
    );
    setWatcher(locWatcher);

    return () => {
      clearInterval(timerId);
      if (locWatcher) {
        locWatcher.remove();
      }
    };
  }

  useEffect(() => {
    let cleanupTimer;
    startLocationUpdates().then((cleanup) => {
      cleanupTimer = cleanup;
    });

    return () => {
      if (cleanupTimer) cleanupTimer();
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const distanceKm = distanceMeters / 1000;
  const pacePerKm = distanceKm > 0 ? elapsedSeconds / distanceKm : 0; // segundos por km
  const formatPace = (paceSec) => {
    if (!paceSec || isNaN(paceSec) || !isFinite(paceSec)) return "--";
    const m = Math.floor(paceSec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(paceSec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}’${s}”`;
  };
  const formattedPace = formatPace(pacePerKm);

  const caloriesBurned = Math.floor(distanceKm * 60);

  return (
    <View style={styles.container}>
      {}
      <LinearGradient
        colors={[colors.BACKGROUND_RED, colors.BACKGROUND_YELLOW]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientHeader}
      />

      {}
      <View style={styles.bottomCard}>
        {}
        {hasPermission ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: path.length > 0 ? path[0].latitude : -23.55052,
              longitude: path.length > 0 ? path[0].longitude : -46.633308,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={false}
            followsUserLocation={false}
            zoomEnabled={true}
          >
            {path.length > 0 && (
              <>
                {}
                <Marker
                  coordinate={{
                    latitude: path[path.length - 1].latitude,
                    longitude: path[path.length - 1].longitude,
                  }}
                  title="Você"
                />
                {}
                <Polyline
                  coordinates={path.map((p) => ({
                    latitude: p.latitude,
                    longitude: p.longitude,
                  }))}
                  strokeColor="#FF0000"
                  strokeWidth={4}
                />
              </>
            )}
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text>Aguardando permissão de localização...</Text>
          </View>
        )}
      </View>

      {}
      <View style={styles.metricsRow}>
        <Metric title="Pace Médio" value={formattedPace} />
        <Metric title="Tempo" value={formatTime(elapsedSeconds)} />
        <Metric title="Calorias" value={caloriesBurned.toString()} />
      </View>

      {}
      <View style={styles.distanceBlock}>
        <Text style={styles.distance}>{distanceKm.toFixed(2)}</Text>
        <Text style={styles.distanceLabel}>Quilômetros</Text>
        <TouchableOpacity style={styles.pauseBtn} onPress={handlePause}>
          <Text style={styles.pauseTxt}>II</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.WHITE,
  },
  // 1) Gradiente restrito somente ao HEADER
  gradientHeader: {
    position: "absolute",
    width,
    height: HEADER_HEIGHT,
  },

  bottomCard: {
    position: "absolute",
    top: HEADER_HEIGHT - 1,
    width,
    height: height - HEADER_HEIGHT + 1,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  metricsRow: {
    position: "absolute",
    top: 40,
    width,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metricBlock: {
    alignItems: "center",
  },
  metricValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 36,
    color: "#000",
  },
  metricTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "rgba(0,0,0,0.6)",
  },

  distanceBlock: {
    position: "absolute",
    top: HEADER_HEIGHT - 80,
    alignSelf: "center",
    width: width * 0.7,
    alignItems: "center",
    zIndex: 10,
  },
  distance: {
    fontFamily: "Poppins-BlackItalic",
    fontSize: 48,
    color: "#000",
  },
  distanceLabel: {
    fontFamily: "Poppins-BlackItalic",
    fontSize: 20,
    color: "rgba(0,0,0,0.6)",
  },
  pauseBtn: {
    marginTop: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  pauseTxt: {
    color: colors.WHITE,
    fontSize: 22,
  },
});
