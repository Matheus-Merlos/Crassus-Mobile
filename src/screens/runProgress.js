// RunProgressScreen.js
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
import axios from "../utils/axios";
import { useAtom } from "jotai";
import { idAtom } from "../jotai/asyncStore";
import * as colors from "../constants/colors";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.35;

export default function RunProgressScreen() {
  const navigation = useNavigation();

  /** ─── Estados ───────────────────────────────────────────────────────────── */
  const [hasPermission, setHasPermission] = useState(false);
  const [path, setPath] = useState([]); // vetor de pontos
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [raceId, setRaceId] = useState(0);

  /** ─── Refs ───────────────────────────────────────────────────────────────── */
  const [userId] = useAtom(idAtom);
  const mapRef = useRef(null);
  const watcherRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  /** ─── Pedir permissão + iniciar corrida ─────────────────────────────────── */
  useEffect(() => {
    async function init() {
      /* 1. Permissão --------------------------------------------------------- */
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso à sua localização para registrar a corrida.",
        );
        return;
      }
      setHasPermission(true);

      /* 2. Cria corrida na API ---------------------------------------------- */
      if (userId) {
        try {
          const res = await axios.post(`/races/${userId}`, {
            startTime: new Date().toISOString(),
          });
          setRaceId(res.data.id);
        } catch (err) {
          console.error("Erro criando corrida:", err);
        }
      }

      /* 3. Inicia cronômetro ------------------------------------------------- */
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setElapsedSeconds(
          Math.floor((Date.now() - startTimeRef.current) / 1000),
        );
      }, 1000);

      /* 4. Inicia listener de localização ----------------------------------- */
      watcherRef.current = await Location.watchPositionAsync(
        {
          /** Precisão alta → GPS; evita “travamento” no primeiro ponto */
          accuracy: Location.Accuracy.Highest, // ou HighestForNavigation
          /** Só um critério: distância mínima entre leituras                   */
          distanceInterval: 0, // ~5 m
          // timeInterval: 0,                  // não misturar com distanceInterval
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;

          setPath((prev) => {
            /* Primeiro ponto ------------------------------------------------ */
            if (!prev.length) {
              return [{ latitude, longitude, timestamp: loc.timestamp }];
            }

            /* Distância entre último e atual -------------------------------- */
            const last = prev[prev.length - 1];
            const delta = haversine(
              { lat: last.latitude, lon: last.longitude },
              { lat: latitude, lon: longitude },
            );

            setDistanceMeters((d) => d + delta);
            return [...prev, { latitude, longitude, timestamp: loc.timestamp }];
          });
        },
      );
    }

    if (userId) init();

    /* Cleanup --------------------------------------------------------------- */
    return () => {
      watcherRef.current?.remove();
      clearInterval(timerRef.current);
    };
  }, [userId]);

  /** ─── Recentraliza o mapa sempre que chegar um ponto novo ───────────────── */
  useEffect(() => {
    if (path.length && mapRef.current) {
      const { latitude, longitude } = path[path.length - 1];
      mapRef.current.animateCamera(
        { center: { latitude, longitude } },
        { duration: 500 },
      );
    }
  }, [path]);

  /** ─── Callback FIM/PAUSE da corrida ────────────────────────────────────── */
  const handlePause = async () => {
    watcherRef.current?.remove();
    clearInterval(timerRef.current);

    try {
      for (const point of path) {
        const requestData = {
          latitude: `${point.latitude}`,
          longitude: `${point.longitude}`,
          timestamp: new Date().toISOString(),
        };
        console.log(requestData);
        try {
          await axios.post(`/races/${userId}/${raceId}/points`, requestData);
        } catch (error) {
          console.log(error.response.data);
        }
      }

      if (raceId) {
        await axios.patch(`/races/${userId}/${raceId}`, {
          endTime: new Date().toISOString(),
        });
        const resp = await axios.get(`/races/${userId}/${raceId}`);
        navigation.replace("RunFinished", {
          totalDistance: distanceMeters / 1000,
          totalTime: elapsedSeconds,
          path: resp.data.points,
        });
        return;
      }
    } catch (err) {
      console.error("Erro ao finalizar corrida:", err);
    }

    // fallback local, caso API falhe
    navigation.replace("RunFinished", {
      totalDistance: distanceMeters / 1000,
      totalTime: elapsedSeconds,
      path,
    });
  };

  /** ─── Helpers de formatação ─────────────────────────────────────────────── */
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const distanceKm = (distanceMeters / 1000).toFixed(2);
  const paceSec =
    distanceMeters > 0 ? elapsedSeconds / (distanceMeters / 1000) : 0;
  const formattedPace = paceSec
    ? `${String(Math.floor(paceSec / 60)).padStart(2, "0")}’${String(Math.floor(paceSec % 60)).padStart(2, "0")}”`
    : "--";
  const caloriesBurned = Math.floor((distanceMeters / 1000) * 60);

  /** ─── UI ────────────────────────────────────────────────────────────────── */
  return (
    <View style={styles.container}>
      {/* Faixa em gradiente (header) */}
      <LinearGradient
        colors={[colors.BACKGROUND_RED, colors.BACKGROUND_YELLOW]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientHeader}
      />

      {/* Cartão inferior (contém o mapa) */}
      <View style={styles.bottomCard}>
        {hasPermission ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: path[0]?.latitude ?? -23.55052,
              longitude: path[0]?.longitude ?? -46.633308,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            followsUserLocation={false}
          >
            {path.map((p, i) => (
              <Marker
                key={i}
                coordinate={{ latitude: p.latitude, longitude: p.longitude }}
              />
            ))}
            <Polyline
              coordinates={path.map((p) => ({
                latitude: p.latitude,
                longitude: p.longitude,
              }))}
              strokeColor="#FF0000"
              strokeWidth={4}
            />
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text>Aguardando permissão de localização...</Text>
          </View>
        )}
      </View>

      {/* Métricas de topo (pace, tempo, calorias) */}
      <View style={styles.metricsRow}>
        {[
          { title: "Pace Médio", value: formattedPace },
          { title: "Tempo", value: formatTime(elapsedSeconds) },
          { title: "Calorias", value: String(caloriesBurned) },
        ].map((m) => (
          <View key={m.title} style={styles.metricBlock}>
            <Text style={styles.metricValue}>{m.value}</Text>
            <Text style={styles.metricTitle}>{m.title}</Text>
          </View>
        ))}
      </View>

      {/* Distância central + botão pause */}
      <View style={styles.distanceBlock}>
        <Text style={styles.distance}>{distanceKm}</Text>
        <Text style={styles.distanceLabel}>Quilômetros</Text>

        <TouchableOpacity style={styles.pauseBtn} onPress={handlePause}>
          <Text style={styles.pauseTxt}>II</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** ─── Estilos (inalterados, exceto possível ajuste de z‑index) ────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  gradientHeader: { position: "absolute", width, height: HEADER_HEIGHT },
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
  map: { flex: 1 },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  metricsRow: {
    position: "absolute",
    top: 40,
    width,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metricBlock: { alignItems: "center" },
  metricValue: { fontFamily: "Poppins-SemiBold", fontSize: 36, color: "#000" },
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
  distance: { fontFamily: "Poppins-BlackItalic", fontSize: 48, color: "#000" },
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
  pauseTxt: { color: colors.WHITE, fontSize: 22 },
});
