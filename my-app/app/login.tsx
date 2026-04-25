import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: "#0f172a",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "white",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          borderRadius: 12,
          padding: 14,
          color: "white",
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          borderRadius: 12,
          padding: 14,
          color: "white",
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={() => router.push("role-select" as any)}
        style={{
          backgroundColor: "#22c55e",
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          Login
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("signup" as any)}>
        <Text style={{ color: "#94a3b8", textAlign: "center" }}>
          Don’t have an account? Sign up
        </Text>
      </Pressable>
    </View>
  );
}