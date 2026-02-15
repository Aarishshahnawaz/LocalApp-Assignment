import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSessionTimer } from "../hooks/useSessionTimer";
import { logEvent } from "../services/analytics";

export default function SessionScreen({ route, navigation }: any) {
  const { email } = route.params;
  const [startTime] = useState(Date.now());
  const time = useSessionTimer(startTime);

  const handleLogout = async () => {
    await logEvent("LOGOUT", { email });
    navigation.replace("Login");
  };

  const formattedStart = new Date(startTime).toLocaleTimeString();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Session Active</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Logged in as</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.timerBox}>
          <Text style={styles.timerLabel}>Session Duration</Text>
          <Text style={styles.timer}>{time}</Text>
        </View>

        <Text style={styles.startTime}>
          Started at: {formattedStart}
        </Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f5f9",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  infoBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#888",
  },
  email: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  timerBox: {
    backgroundColor: "#f5f7ff",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  timerLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  timer: {
    fontSize: 36,
    fontWeight: "700",
    color: "#4f46e5",
  },
  startTime: {
    fontSize: 13,
    color: "#888",
    marginBottom: 25,
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
