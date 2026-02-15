import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  validateOTP,
  generateOTP,
  getOTPEntry,
} from "../services/otpManager";
import { logEvent } from "../services/analytics";

export default function OtpScreen({ route, navigation }: any) {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      const entry = getOTPEntry(email);
      if (!entry) return;

      const remaining = Math.max(
        0,
        Math.floor((entry.expiresAt - Date.now()) / 1000)
      );
      setSecondsLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [email]);

  const handleVerify = async () => {
    const result = validateOTP(email, otp);

    if (result.success) {
      await logEvent("OTP_SUCCESS", { email });
      navigation.replace("Session", { email });
    } else {
      await logEvent("OTP_FAILURE", { email, reason: result.message });
      alert(result.message);
    }
  };

  const handleResend = async () => {
    const entry = generateOTP(email);
    await logEvent("OTP_GENERATED", { email, otp: entry.code });
    alert(`New OTP: ${entry.code}`);
    setOtp("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the code sent to{`\n`}
          {email}
        </Text>

        <TextInput
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          placeholder="Enter 6-digit OTP"
          maxLength={6}
        />

        <Text style={styles.timer}>
          Expires in: {secondsLeft}s
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResend}
          disabled={secondsLeft > 0}
        >
          <Text
            style={[
              styles.resend,
              secondsLeft > 0 && { opacity: 0.4 },
            ]}
          >
            Resend OTP
          </Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 6,
    backgroundColor: "#fafafa",
    marginBottom: 15,
  },
  timer: {
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resend: {
    textAlign: "center",
    color: "#4f46e5",
    fontWeight: "600",
  },
});
