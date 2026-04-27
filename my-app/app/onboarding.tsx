import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { useUser } from "../context/UserContext";

export default function Onboarding() {
  const router = useRouter();
  const { setUser } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [maxDistance, setMaxDistance] = useState(5);

  const handleContinue = () => {
    if (!name || !email || !location) {
      Alert.alert("Completează toate câmpurile");
      return;
    }

    setUser({
      name,
      email,
      location,
      maxDistance,
    });

    router.push("/main");
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#0f172a",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
        Spune-ne despre tine
      </Text>

      <TextInput
        placeholder="Nume"
        placeholderTextColor="#94a3b8"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="ex: Sector 6, Drumul Taberei"
        placeholderTextColor="#94a3b8"
        value={location}
        onChangeText={setLocation}
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <Text style={{ color: "white", marginBottom: 8 }}>
        Distanță maximă: {maxDistance} km
      </Text>

      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
        value={maxDistance}
        onValueChange={(value) => setMaxDistance(value)}
        minimumTrackTintColor="#22c55e"
        maximumTrackTintColor="#475569"
        thumbTintColor="#22c55e"
        style={{ marginBottom: 30 }}
      />

      <Pressable
        onPress={handleContinue}
        style={{
          backgroundColor: "#22c55e",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Continuă
        </Text>
      </Pressable>
    </View>
  );
}