import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Facturi() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const { setFactura } = useApp();

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [postal, setPostal] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      
      <Pressable onPress={() => router.back()} style={{ marginBottom: 10 }}>
        <Text style={{ color: "#22c55e" }}>← Înapoi</Text>
      </Pressable>

      <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
        Informații pentru factură
      </Text>

      {[["Strada", street, setStreet],
        ["Nr.", number, setNumber],
        ["Localitate", city, setCity],
        ["Județ", county, setCounty],
        ["Cod poștal", postal, setPostal],
      ].map(([label, val, setter]: any) => (
        <TextInput
          key={label}
          placeholder={label}
          placeholderTextColor="#64748b"
          value={val}
          onChangeText={setter}
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            padding: 12,
            borderRadius: 10,
            marginBottom: 12,
          }}
        />
      ))}

      <Pressable
        onPress={() => {
          setFactura({ street, number, city, county, postal });
          router.push({
            pathname: "/checkout",
            params: { item },
          });
        }}
        style={{
          backgroundColor: "#22c55e",
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Continuă către plată
        </Text>
      </Pressable>
    </View>
  );
}