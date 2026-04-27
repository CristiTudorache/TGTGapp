import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

const roles = [
  {
    role: "consumer",
    label: "Consumer",
    desc: "Find and save surplus food near you",
    icon: "🛍️",
  },
  {
    role: "producer",
    label: "Producer",
    desc: "Share your surplus food with others",
    icon: "🚜",
  },
  {
    role: "ngo",
    label: "NGO",
    desc: "Collect and distribute donated food",
    icon: "❤️",
  },
];

export default function RoleSelect() {
  const router = useRouter();

  const handleSelect = (role: "consumer" | "producer" | "ngo") => {
    if (role === "consumer") {
      router.push("/onboarding");
    }

    if (role === "producer") {
      router.push("/producer" as any); // placeholder screen
    }

    if (role === "ngo") {
      router.push("/ngo" as any); //  ngo flow
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        backgroundColor: "#0f172a",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "white",
          marginBottom: 8,
        }}
      >
        Who are you?
      </Text>

      <Text style={{ color: "#94a3b8", marginBottom: 32 }}>
        Choose your role to get started
      </Text>

      <View style={{ gap: 16 }}>
        {roles.map((r) => (
          <Pressable
            key={r.role}
            onPress={() => handleSelect(r.role as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              padding: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#334155",
              backgroundColor: "#1e293b",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: "#22c55e20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24 }}>{r.icon}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  marginBottom: 4,
                }}
              >
                {r.label}
              </Text>

              <Text style={{ color: "#94a3b8", fontSize: 12 }}>
                {r.desc}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}