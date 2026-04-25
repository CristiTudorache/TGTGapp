import { View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function TopSection() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // 1 real second = 1 app minute
      setTime((prev) => new Date(prev.getTime() + 60000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ✅ CAPITALIZED DATE FIX
  const rawDate = time.toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const formattedDate =
    rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: "#94a3b8", marginBottom: 6 }}>
        {formattedDate} • {formattedTime}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        FoodLink
      </Text>

      <View
        style={{
          marginTop: 10,
          backgroundColor: "#1e293b",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#22c55e" }}>
          🥗 Fără junk food — doar mâncare reală, sănătoasă
        </Text>
      </View>
    </View>
  );
}