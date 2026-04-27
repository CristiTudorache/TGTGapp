import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ProducerSetup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState<"farmer" | "shop" | null>(null);

  // ✅ EMAIL VALIDATION (real)
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = () => {
    // ❌ EMPTY CHECK
    if (!name || !email || !city || !address || !type) {
      Alert.alert("Eroare", "Completează toate câmpurile");
      return;
    }

    // ❌ EMAIL CHECK
    if (!validateEmail(email)) {
      Alert.alert("Email invalid", "Introdu un email valid (ex: nume@gmail.com)");
      return;
    }

    // ✅ SUCCESS → go to main producer app
    router.replace("/main"); // or "/producer-home" if you have one
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 20,
        justifyContent: "center",
      }}
    >
      {/* TITLE */}
      <Text style={{ color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 8 }}>
        Configurează profilul
      </Text>

      <Text style={{ color: "#94a3b8", marginBottom: 20 }}>
        Completează profilul pentru a începe
      </Text>

      {/* NAME */}
      <Text style={label}>Nume</Text>
      <TextInput
        placeholder="Numele tău"
        placeholderTextColor="#64748b"
        value={name}
        onChangeText={setName}
        style={input}
      />

      {/* EMAIL */}
      <Text style={label}>Email</Text>
      <TextInput
        placeholder="email@exemplu.com"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        style={input}
      />

      {/* CITY */}
      <Text style={label}>Oraș</Text>
      <TextInput
        placeholder="București"
        placeholderTextColor="#64748b"
        value={city}
        onChangeText={setCity}
        style={input}
      />

      {/* ADDRESS */}
      <Text style={label}>Adresă / Zonă</Text>
      <TextInput
        placeholder="Sector 6, Drumul Taberei"
        placeholderTextColor="#64748b"
        value={address}
        onChangeText={setAddress}
        style={input}
      />

      {/* TYPE */}
      <Text style={[label, { marginTop: 12 }]}>Tip</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => setType("farmer")}
          style={[
            typeBtn,
            type === "farmer" && activeType,
          ]}
        >
          <Text style={type === "farmer" ? activeText : normalText}>
            🌾 Fermier
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setType("shop")}
          style={[
            typeBtn,
            type === "shop" && activeType,
          ]}
        >
          <Text style={type === "shop" ? activeText : normalText}>
            🏪 Magazin / Restaurant
          </Text>
        </Pressable>
      </View>

      {/* BUTTON */}
      <Pressable onPress={handleContinue} style={button}>
        <Text style={{ color: "white", fontWeight: "600" }}>
          Continuă
        </Text>
      </Pressable>
    </View>
  );
}

/* ================= STYLES ================= */

const input = {
  backgroundColor: "#1e293b",
  padding: 12,
  borderRadius: 10,
  marginTop: 6,
  color: "white",
  marginBottom: 12,
};

const label = {
  color: "#94a3b8",
  marginTop: 6,
};

const button = {
  backgroundColor: "#22c55e",
  padding: 14,
  borderRadius: 12,
  marginTop: 20,
  alignItems: "center" as const,
};

const typeBtn = {
  flex: 1,
  padding: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#334155",
  alignItems: "center" as const,
};

const activeType = {
  backgroundColor: "#22c55e20",
  borderColor: "#22c55e",
};

const activeText = {
  color: "#22c55e",
  fontWeight: "600" as const,
};

const normalText = {
  color: "#94a3b8",
};