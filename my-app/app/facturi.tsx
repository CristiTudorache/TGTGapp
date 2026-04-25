import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ ADD THIS

export default function Facturi() {
  const { factura, setFactura } = useApp();
  const router = useRouter();
  const { item } = useLocalSearchParams();

  // ✅ SAFE DEFAULTS
  const [name, setName] = useState<string>(factura?.name ?? "");
  const [company, setCompany] = useState<string>(factura?.company ?? "");
  const [cui, setCui] = useState<string>(factura?.cui ?? "");
  const [address, setAddress] = useState<string>(factura?.address ?? "");
  const [city, setCity] = useState<string>(factura?.city ?? "");
  const [phone, setPhone] = useState<string>(factura?.phone ?? "");

  const input = {
    backgroundColor: "#334155",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  };

  const handleSave = () => {
    if (!name || !address || !city || !phone) {
      alert("Completează câmpurile obligatorii");
      return;
    }

    setFactura({
      name,
      company,
      cui,
      address,
      city,
      phone,
    });

    router.push({
      pathname: "/checkout",
      params: { item },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 40,
        }}
      >
        {/* ✅ BACK BUTTON NOW SAFE */}
        <BackButton />

        <Text
          style={{
            color: "white",
            fontSize: 22,
            marginBottom: 20,
          }}
        >
          Informații factură
        </Text>

        <TextInput
          placeholder="Nume complet"
          placeholderTextColor="#94a3b8"
          style={input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Firmă (opțional)"
          placeholderTextColor="#94a3b8"
          style={input}
          value={company}
          onChangeText={setCompany}
        />

        <TextInput
          placeholder="CUI (opțional)"
          placeholderTextColor="#94a3b8"
          style={input}
          value={cui}
          onChangeText={setCui}
        />

        <TextInput
          placeholder="Adresă"
          placeholderTextColor="#94a3b8"
          style={input}
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          placeholder="Oraș"
          placeholderTextColor="#94a3b8"
          style={input}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          placeholder="Telefon"
          placeholderTextColor="#94a3b8"
          style={input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Pressable
          onPress={handleSave}
          style={{
            backgroundColor: "#22c55e",
            padding: 16,
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Continuă
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}