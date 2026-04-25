import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import BackButton from "../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ ADD THIS

export default function Cards() {
  const { cards, addCard, removeCard } = useApp();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleAddCard = () => {
    if (!number || !name || !expiry) {
      alert("Completează toate câmpurile");
      return;
    }

    addCard({
      id: Date.now().toString(),
      number,
      name,
      expiry,
    });

    setNumber("");
    setName("");
    setExpiry("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: 10, // ✅ FIX (NOT 40)
          paddingBottom: 40,
        }}
      >
        {/* BACK BUTTON */}
        <BackButton />

        {/* TITLE */}
        <Text
          style={{
            color: "white",
            fontSize: 22,
            marginBottom: 20,
          }}
        >
          Carduri salvate
        </Text>

        {/* SAVED CARDS */}
        {cards.length === 0 && (
          <Text style={{ color: "#94a3b8", marginBottom: 20 }}>
            Nu ai carduri salvate
          </Text>
        )}

        {cards.map((c) => (
          <View
            key={c.id}
            style={{
              backgroundColor: "#1e293b",
              padding: 14,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              •••• {c.number.slice(-4)}
            </Text>

            <Text style={{ color: "#94a3b8", marginTop: 4 }}>
              {c.name} • {c.expiry}
            </Text>

            <Pressable onPress={() => removeCard(c.id)}>
              <Text
                style={{
                  color: "#ef4444",
                  marginTop: 8,
                  fontWeight: "bold",
                }}
              >
                Șterge
              </Text>
            </Pressable>
          </View>
        ))}

        {/* ADD CARD */}
        <Text
          style={{
            color: "white",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Adaugă card nou
        </Text>

        <TextInput
          placeholder="Număr card"
          placeholderTextColor="#94a3b8"
          style={input}
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Nume titular"
          placeholderTextColor="#94a3b8"
          style={input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="MM/YY"
          placeholderTextColor="#94a3b8"
          style={input}
          value={expiry}
          onChangeText={setExpiry}
        />

        <Pressable onPress={handleAddCard} style={button}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Adaugă card
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const input = {
  backgroundColor: "#334155",
  color: "white",
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
};

const button = {
  backgroundColor: "#22c55e",
  padding: 14,
  borderRadius: 12,
};