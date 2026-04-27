import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // way better email validation
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        backgroundColor: "#0f172a",
      }}
    >
      <Pressable onPress={() => router.push("/" as any)} style={{ marginBottom: 24 }}>
        <Text style={{ color: "#94a3b8", fontSize: 18 }}>←</Text>
      </Pressable>

      <View style={{ flex: 1 }}>

        {/* logo */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 70, height: 70, marginBottom: 10 }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "white",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Create account
        </Text>

        <Text style={{ color: "#94a3b8", marginBottom: 32, textAlign: "center" }}>
          Join the food waste revolution
        </Text>

        <View style={{ gap: 16 }}>
          {/* email */}
          <View>
            <Text style={{ color: "#94a3b8", marginBottom: 6 }}>Email</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              style={{
                borderWidth: 1,
                borderColor: "#334155",
                borderRadius: 12,
                padding: 14,
                color: "white",
              }}
            />
          </View>

          {/* password */}
          <View>
            <Text style={{ color: "#94a3b8", marginBottom: 6 }}>Password</Text>
            <TextInput
              placeholder="Minimum 6 characters"
              placeholderTextColor="#64748b"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{
                borderWidth: 1,
                borderColor: "#334155",
                borderRadius: 12,
                padding: 14,
                color: "white",
              }}
            />
          </View>

          {/* BUTTON */}
          <Pressable
            onPress={() => {
              if (!email || !password) {
                Alert.alert("Error", "Completează toate câmpurile");
                return;
              }

              if (!validateEmail(email)) {
                Alert.alert("Invalid email", "Email invalid (ex: nume@gmail.com)");
                return;
              }

              if (password.length < 6) {
                Alert.alert("Parolă slabă", "Minim 6 caractere");
                return;
              }

              router.push("role-select" as any);
            }}
            style={{
              backgroundColor: "#22c55e",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Create Account
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.push("login" as any)} style={{ marginTop: 24 }}>
          <Text style={{ color: "#94a3b8", textAlign: "center" }}>
            Already have an account? <Text style={{ color: "#22c55e" }}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}