import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logEvent(event: string, data?: any) {
  const log = {
    event,
    data,
    time: new Date().toISOString(),
  };

  console.log("[Analytics]", log);

  const existing = await AsyncStorage.getItem("logs");
  const logs = existing ? JSON.parse(existing) : [];
  logs.push(log);

  await AsyncStorage.setItem("logs", JSON.stringify(logs));
}
