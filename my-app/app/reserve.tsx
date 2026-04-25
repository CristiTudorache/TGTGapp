import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import BackButton from "../components/BackButton";

export default function Reserve() {
  const router = useRouter();
  const { item } = useLocalSearchParams();

  const parsedItem = JSON.parse(item as string);

  const [showDonation, setShowDonation] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      contentContainerStyle={{
        padding: 16,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      {/* 🔴 TEST (REMOVE AFTER CONFIRMING) */}
      <Text style={{ color: "red", fontSize: 18, marginBottom: 10 }}>
        RESERVE SCREEN ACTIVE
      </Text>

      {/* BACK */}
      <BackButton />

      {/* IMAGE */}
      <Image
        source={{ uri: parsedItem.image }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 12,
          marginBottom: 16,
        }}
      />

      {/* TITLE */}
      <Text style={{ color: "white", fontSize: 22, marginBottom: 6 }}>
        {parsedItem.title}
      </Text>

      {/* PRICE */}
      <Text style={{ color: "#22c55e", fontSize: 18, marginBottom: 10 }}>
        {parsedItem.price} RON
      </Text>

      {/* DESCRIPTION */}
      <Text style={{ color: "#94a3b8", marginBottom: 20 }}>
        {parsedItem.description}
      </Text>

      {/* ================= BUY ================= */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/facturi",
            params: { item: JSON.stringify(parsedItem) },
          })
        }
        style={{
          backgroundColor: "#22c55e",
          padding: 16,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Cumpără acum
        </Text>
      </Pressable>

      {/* ================= DONATE BUTTON ================= */}
      <Pressable
        onPress={() => setShowDonation((prev) => !prev)}
        style={{
          borderWidth: 1,
          borderColor: "#22c55e",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#22c55e",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ❤️ Donează o porție
        </Text>
      </Pressable>

      {/* ================= EXPANDED DONATION ================= */}
      {showDonation && (
        <View
          style={{
            backgroundColor: "#1e293b",
            padding: 16,
            borderRadius: 12,
            marginTop: 12,
          }}
        >
          <Text style={{ color: "white", marginBottom: 6 }}>
            Donezi acest produs:
          </Text>

          <Text style={{ color: "#94a3b8", marginBottom: 10 }}>
            {parsedItem.title}
          </Text>

          <Text style={{ color: "#22c55e", marginBottom: 14 }}>
            {parsedItem.price} RON
          </Text>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/checkout",
                params: {
                  item: JSON.stringify(parsedItem),
                  donation: "true",
                },
              })
            }
            style={{
              backgroundColor: "#22c55e",
              padding: 14,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
              Plătește donația
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}