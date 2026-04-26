import { useLocalSearchParams, useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const router = useRouter();
  const { item, donation } = useLocalSearchParams();

  const parsedItem = item ? JSON.parse(item as string) : null;

  // ✅ ONLY ADD: addNotification
  const {
    addOrder,
    addCard,
    addDonation,
    cards,
    addPoints,
  } = useApp();

  const isDonation = donation === "true";

  const [step, setStep] = useState<"method" | "card">(
    isDonation ? "card" : "method"
  );

  const [method, setMethod] = useState<"cash" | "card" | null>(
    isDonation ? "card" : null
  );

  const [cardMode, setCardMode] = useState<"new" | "saved">("new");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [saveCard, setSaveCard] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // ================= PAYMENT LOGIC =================
  const handlePay = () => {
    if (!parsedItem) return;

    // CARD VALIDATION
    if (cardMode === "saved" && !selectedCardId) {
      alert("Selectează un card salvat");
      return;
    }

    if (cardMode === "new") {
      if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Completează toate câmpurile cardului");
        return;
      }
    }

    // SAVE CARD
    if (cardMode === "new" && saveCard) {
      addCard({
        id: Date.now().toString(),
        number: cardNumber,
        name: cardName,
        expiry,
      });
    }

    // ================= DONATION =================
    if (isDonation) {
      addDonation({
        id: Date.now().toString(),
        item: parsedItem,
        date: Date.now(),
      });


      router.replace("/main");
      return;
    }

    // ================= NORMAL ORDER =================
    addOrder({
      id: Date.now().toString(),
      item: parsedItem,
      date: Date.now(),
    });

    // ⭐ ADD POINTS (1 RON = 1 point)
    if (parsedItem.price) {
      const priceNumber = Math.round(
        parseFloat(parsedItem.price.replace(",", "."))
      );

      if (!isNaN(priceNumber)) {
        addPoints(priceNumber);
      }
    }

   

    router.replace({
      pathname: "/main",
      params: { tab: "orders" },
    });
  };

  const inputStyle = {
    backgroundColor: "#334155",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  };

  const cardBox = {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <BackButton />

        <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
          {isDonation ? "Donează" : "Checkout"}
        </Text>

        {/* STEP 1 */}
        {!isDonation && step === "method" && (
          <>
            <Text style={{ color: "white", marginBottom: 10 }}>
              Alege metoda de plată
            </Text>

            <Pressable
              onPress={() => {
                setMethod("cash");
                handlePay();
              }}
              style={{
                backgroundColor: "#334155",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cash la ridicare
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setMethod("card");
                setStep("card");
              }}
              style={{
                backgroundColor: "#22c55e",
                padding: 16,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Plătește cu cardul
              </Text>
            </Pressable>
          </>
        )}

        {/* CARD STEP */}
        {(step === "card" || isDonation) && (
          <>
            {!isDonation && (
              <Pressable onPress={() => setStep("method")}>
                <Text style={{ color: "#22c55e", marginBottom: 12 }}>
                  ← Înapoi
                </Text>
              </Pressable>
            )}

            <Text style={{ color: "white", marginBottom: 10 }}>
              Alege card
            </Text>

            <View style={{ flexDirection: "row", marginBottom: 14 }}>
              <Pressable
                onPress={() => setCardMode("new")}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: cardMode === "new" ? "#22c55e" : "white" }}>
                  Card nou
                </Text>
              </Pressable>

              <Pressable onPress={() => setCardMode("saved")}>
                <Text style={{ color: cardMode === "saved" ? "#22c55e" : "white" }}>
                  Card salvat
                </Text>
              </Pressable>
            </View>

            {/* SAVED */}
            {cardMode === "saved" && (
              <>
                {cards.length === 0 && (
                  <Text style={{ color: "#94a3b8", marginBottom: 10 }}>
                    Nu ai carduri salvate
                  </Text>
                )}

                {cards.map((card) => (
                  <Pressable
                    key={card.id}
                    onPress={() => setSelectedCardId(card.id)}
                    style={{
                      ...cardBox,
                      backgroundColor:
                        selectedCardId === card.id
                          ? "#22c55e"
                          : "#334155",
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      •••• {card.number.slice(-4)}
                    </Text>
                    <Text style={{ color: "#cbd5f5", fontSize: 12 }}>
                      {card.name} • {card.expiry}
                    </Text>
                  </Pressable>
                ))}
              </>
            )}

            {/* NEW */}
            {cardMode === "new" && (
              <>
                <TextInput
                  placeholder="Număr card"
                  placeholderTextColor="#94a3b8"
                  style={inputStyle}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />

                <TextInput
                  placeholder="Nume titular"
                  placeholderTextColor="#94a3b8"
                  style={inputStyle}
                  value={cardName}
                  onChangeText={setCardName}
                />

                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor="#94a3b8"
                  style={inputStyle}
                  value={expiry}
                  onChangeText={setExpiry}
                />

                <TextInput
                  placeholder="CVV"
                  placeholderTextColor="#94a3b8"
                  style={inputStyle}
                  value={cvv}
                  onChangeText={setCvv}
                  secureTextEntry
                  keyboardType="numeric"
                />

                <Pressable onPress={() => setSaveCard(!saveCard)}>
                  <Text style={{ color: "white", marginTop: 6 }}>
                    {saveCard ? "☑" : "☐"} Salvează cardul
                  </Text>
                </Pressable>

                <Text style={{ color: "#94a3b8", marginTop: 6 }}>
                  🔒 Datele sunt criptate și securizate
                </Text>
              </>
            )}

            <Pressable
              onPress={handlePay}
              style={{
                backgroundColor: "#22c55e",
                padding: 16,
                borderRadius: 12,
                marginTop: 20,
              }}
            >
              <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
                {isDonation ? "Donează acum ❤️" : "Plătește"}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}