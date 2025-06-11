import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({ label, current, total, color }) {
  const percentage = Math.min(current / total, 1) * 100;

  const styles = StyleSheet.create({
    container: {
      marginVertical: 6,
      width: 100,
    },
    label: {
      fontFamily: "Poppins-Regular",
      opacity: 0.5,
      fontSize: 14,
      textAlign: "center",
    },
    value: {
      fontSize: 14,
      fontFamily: "Poppins-SemiBold",
      textAlign: "center",
      width: 120,
    },
    barBackground: {
      height: 8,
      backgroundColor: "#E0E0E0",
      borderRadius: 10,
      overflow: "hidden",
    },
    barFill: {
      height: "100%",
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.value}>
        {current} / {total} g
      </Text>
    </View>
  );
}
