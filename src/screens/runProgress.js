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

  /* ─── Estados ─────────────────────────────────────────────────────────── */
  const [hasPermission, setHasPermission] = useState(false);
  const [path, setPath]             = useState([]);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [raceId, setRaceId]         = useState(null);   // ← null, não 0

  /* ─── Refs ─────────────────────────────────────────────────────────────── */
  const [userId] = useAtom(idAtom);
  const mapRef      = useRef(null);
  const watcherRef  = useRef(null);
  const timerRef    = useRef(null);
  const startTimeRef = useRef(0);

  /* ─── Valores derivados ───────────────────────────────────────────────── */
  const paceSec = distanceMeters ? elapsedSeconds / (distanceMeters / 1000) : 0;
  const formattedPace = paceSec
    ? `${String(Math.floor(paceSec / 60)).padStart(2, "0")}’${String(Math.floor(paceSec % 60)).padStart(2, "0")}”`
    : "--";
  const caloriesBurned = Math.floor((distanceMeters / 1000) * 60);

  /* ─── Montagem: permissão, API, cronômetro, GPS ───────────────────────── */
  useEffect(() => {
    let mounted = true;

    async function init() {
      /* 1) Permissão */
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão necessária",
          "Precisamos de acesso à sua localização para registrar a corrida.");
        return;
      }
      if (mounted) setHasPermission(true);

      /* 2) Cria corrida */
      if (userId) {
        try {
          const { data } = await axios.post(`/races/${userId}`, {
            startTime: new Date().toISOString(),
          });
          if (mounted) setRaceId(data.id);
        } catch (e) {
          console.error("Erro criando corrida:", e);
        }
      }

      /* 3) Cronômetro */
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (mounted) {
          setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
      }, 1000);

      /* 4) GPS */
      watcherRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 5,   // ~5 m; 0 pode não disparar
        },
        loc => {
          const { latitude, longitude } = loc.coords;

          setPath(prev => {
            if (prev.length === 0) {
              return [{ latitude, longitude, timestamp: loc.timestamp }];
            }
            const last  = prev[prev.length - 1];
            const delta = haversine(
              { lat: last.latitude, lon: last.longitude },
              { lat: latitude,      lon: longitude }
            );
            if (delta < 1 || delta > 100) return prev;  // filtra ruído
            setDistanceMeters(d => d + delta);
            return [...prev, { latitude, longitude, timestamp: loc.timestamp }];
          });
        }
      );
    }

    if (userId) init();
    return () => {
      mounted = false;
      watcherRef.current?.remove();
      clearInterval(timerRef.current);
    };
  }, [userId]);

  /* ─── Recentraliza mapa ───────────────────────────────────────────────── */
  useEffect(() => {
    if (path.length && mapRef.current) {
      const { latitude, longitude } = path[path.length - 1];
      mapRef.current.animateCamera({ center: { latitude, longitude } }, { duration: 500 });
    }
  }, [path]);

  /* ─── Finaliza corrida ────────────────────────────────────────────────── */
  const handlePause = async () => {
    watcherRef.current?.remove();
    clearInterval(timerRef.current);

    /* Marca fim na API (ignorar erro) */
    try {
      if (raceId) {
        await axios.patch(`/races/${userId}/${raceId}`, {
          endTime: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn("PATCH endTime falhou:", err.response?.data ?? err.message);
    }

    /* Envio paralelo dos pontos (não bloqueia UI) */
    if (raceId && path.length) {
      Promise.all(
        path.map(p =>
          axios.post(`/races/${userId}/${raceId}/points`, {
            latitude:  p.latitude.toString(),
            longitude: p.longitude.toString(),
            timestamp: new Date(p.timestamp ?? Date.now()).toISOString(),
          })
        )
      ).catch(err =>
        console.warn("Algum ponto falhou:", err.response?.data ?? err.message)
      );
    }

    /* Navega já */
    const startDatetime = new Date(startTimeRef.current).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    navigation.replace("RunFinished", {
      title:         "Minha Corrida",
      datetime:      startDatetime,
      totalDistance: distanceMeters / 1000,
      totalTime:     elapsedSeconds,
      pace:          formattedPace,
      calories:      caloriesBurned,
      elevation:     "—",
      bpmMax:        "—",
      path,                                // usa o que já tem em memória
    });
  };

  /* ─── Helpers ─────────────────────────────────────────────────────────── */
  const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  /* ─── UI ──────────────────────────────────────────────────────────────── */
  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.BACKGROUND_RED, colors.BACKGROUND_YELLOW]}
                      start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                      style={styles.gradientHeader} />

      <View style={styles.bottomCard}>
        {hasPermission ? (
          <MapView ref={mapRef} style={styles.map}
                   initialRegion={{
                     latitude: path[0]?.latitude ?? -23.55052,
                     longitude: path[0]?.longitude ?? -46.633308,
                     latitudeDelta: 0.01,
                     longitudeDelta: 0.01,
                   }}
                   showsUserLocation>
            {path.map((p, i) => <Marker key={i} coordinate={p} />)}
            <Polyline coordinates={path} strokeColor="#FF0000" strokeWidth={4} />
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text>Aguardando permissão de localização...</Text>
          </View>
        )}
      </View>

      <View style={styles.metricsRow}>
        {[
          { title: "Pace Médio", value: formattedPace },
          { title: "Tempo",      value: formatTime(elapsedSeconds) },
          { title: "Calorias",   value: caloriesBurned.toString() },
        ].map(m => (
          <View key={m.title} style={styles.metricBlock}>
            <Text style={styles.metricValue}>{m.value}</Text>
            <Text style={styles.metricTitle}>{m.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.distanceBlock}>
        <Text style={styles.distance}>{(distanceMeters / 1000).toFixed(2)}</Text>
        <Text style={styles.distanceLabel}>Quilômetros</Text>
        <TouchableOpacity style={styles.pauseBtn} onPress={handlePause}>
          <Text style={styles.pauseTxt}>II</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ─── Estilos ───────────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  gradientHeader: { position: "absolute", width, height: HEADER_HEIGHT },
  bottomCard: {
    position: "absolute",
    top: HEADER_HEIGHT - 1, width,
    height: height - HEADER_HEIGHT + 1,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 60, borderTopRightRadius: 60,
    overflow: "hidden",
  },
  map: { flex: 1 },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  metricsRow: {
    position: "absolute", top: 40, width,
    flexDirection: "row", justifyContent: "space-around",
  },
  metricBlock: { alignItems: "center" },
  metricValue: { fontFamily: "Poppins-SemiBold", fontSize: 36, color: "#000" },
  metricTitle: { fontFamily: "Poppins-Regular", fontSize: 18, color: "rgba(0,0,0,0.6)" },
  distanceBlock: {
    position: "absolute", top: HEADER_HEIGHT - 80,
    alignSelf: "center", width: width * 0.7,
    alignItems: "center", zIndex: 10,
  },
  distance: { fontFamily: "Poppins-BlackItalic", fontSize: 48, color: "#000" },
  distanceLabel: { fontFamily: "Poppins-Regular", fontSize: 20, color: "rgba(0,0,0,0.6)" },
  pauseBtn: {
    marginTop: 20, width: 70, height: 70, borderRadius: 35,
    backgroundColor: "#000", alignItems: "center", justifyContent: "center",
  },
  pauseTxt: { color: colors.WHITE, fontSize: 22 },
});
