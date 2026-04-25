import React, { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useUser } from "../context/UserContext";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const { cards, removeCard } = useApp();

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);

  const save = () => {
    setUser({
      ...user,
      name,
      email,
      location,
    });
    setEditing(false);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#0f172a" }}>
      
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
        Profil
      </Text>

      {/* ================= PROFILE ================= */}
      {editing ? (
        <>
          <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Nume</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Introdu numele"
            placeholderTextColor="#64748b"
            style={input}
          />

          <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Introdu email"
            placeholderTextColor="#64748b"
            style={input}
          />

          <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Locație</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Ex: Sector 3"
            placeholderTextColor="#64748b"
            style={input}
          />

          <Pressable onPress={save} style={button}>
            <Text style={buttonText}>Salvează</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={{ color: "white", marginBottom: 6 }}>
            Nume: {user.name}
          </Text>
          <Text style={{ color: "white", marginBottom: 6 }}>
            Email: {user.email}
          </Text>
          <Text style={{ color: "white", marginBottom: 6 }}>
            Locație: {user.location}
          </Text>

          <Pressable
            onPress={() => setEditing(true)}
            style={[button, { marginBottom: 20 }]}
          >
            <Text style={buttonText}>Editează profil</Text>
          </Pressable>
        </>
      )}

      {/* ================= CARDS ================= */}
      <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
        Carduri salvate
      </Text>

      {cards.length === 0 ? (
        <Text style={{ color: "#94a3b8" }}>
          Nu ai carduri salvate
        </Text>
      ) : (
        cards.map((card) => (
          <View key={card.id} style={cardBox}>
            <Text style={{ color: "white" }}>
              •••• {card.number.slice(-4)}
            </Text>

            <Pressable onPress={() => removeCard(card.id)}>
              <Text style={{ color: "#ef4444" }}>Șterge</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const input = {
  backgroundColor: "#1e293b",
  color: "white",
  padding: 12,
  borderRadius: 10,
  marginBottom: 12,
};

const button = {
  backgroundColor: "#22c55e",
  padding: 14,
  borderRadius: 10,
};

const buttonText = {
  color: "white",
  textAlign: "center" as const,
};

const cardBox = {
  backgroundColor: "#1e293b",
  padding: 12,
  borderRadius: 10,
  marginTop: 10,
  flexDirection: "row" as const,
  justifyContent: "space-between" as const,
};