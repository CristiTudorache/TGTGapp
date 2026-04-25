import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        backgroundColor: "#0f172a",
      }}
    >
      <View
        style={{
          alignItems: "center",
          maxWidth: 320,
          width: "100%",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* ✅ REPLACED ICON WITH LOGO */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#1e293b",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            marginBottom: 12,
          }}
        >
          FoodLink
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Reduce food waste. Feed communities. Make an impact.
        </Text>

        <View style={{ width: "100%", gap: 12 }}>
          <Pressable
            onPress={() => router.push("signup" as any)}
            style={{
              backgroundColor: "#22c55e",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Get Started →
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("login" as any)}
            style={{
              borderWidth: 1,
              borderColor: "#334155",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              I already have an account
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            color: "#64748b",
            fontSize: 12,
            marginTop: 32,
            textAlign: "center",
          }}
        >
          Join thousands reducing food waste in your community
        </Text>
      </View>
    </View>
  );
}