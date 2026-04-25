import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const router = useRouter();
  const { user, setUser } = useUser();

  // ✅ include donations
  const { orders, donations } = useApp();

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);

  const save = () => {
    if (!name || !email || !location) {
      alert("Completează toate câmpurile");
      return;
    }

    setUser({
      ...user,
      name,
      email,
      location,
    });

    setEditing(false);
  };

  // ================= REWARD LOGIC =================

  const parsePrice = (price: string) => {
    return Math.round(parseFloat(price.replace(",", ".")));
  };

  // ✅ orders money
  const totalSpentOrders = orders.reduce((sum, order) => {
    return sum + parsePrice(order.item.price);
  }, 0);

  // ✅ donations money
  const totalSpentDonations = donations.reduce((sum, d) => {
    return sum + parsePrice(d.item.price);
  }, 0);

  // ✅ FINAL TOTAL
  const totalSpent = totalSpentOrders + totalSpentDonations;

  // ✅ points = total lei spent
  const totalPoints = totalSpent;

  const totalOrders = orders.length;
  const totalDonations = donations.length;

  // ================= UI =================

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      contentContainerStyle={{
        padding: 16,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          color: "white",
          fontSize: 22,
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        Profil
      </Text>

      {/* ================= PROFILE CARD ================= */}
      <View
        style={{
          backgroundColor: "#1e293b",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        {editing ? (
          <>
            <Text style={label}>Nume</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nume"
              placeholderTextColor="#64748b"
              style={input}
            />

            <Text style={label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#64748b"
              style={input}
            />

            <Text style={label}>Locație</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Locație"
              placeholderTextColor="#64748b"
              style={input}
            />

            <Pressable onPress={save} style={buttonGreen}>
              <Text style={centerText}>Salvează</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={{ color: "white", fontSize: 18, marginBottom: 6 }}>
              {user.name}
            </Text>

            <Text style={{ color: "#94a3b8", marginBottom: 4 }}>
              {user.email}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              {user.location}
            </Text>

            <Pressable
              onPress={() => setEditing(true)}
              style={[buttonGray, { marginTop: 12 }]}
            >
              <Text style={centerText}>Editează profil</Text>
            </Pressable>
          </>
        )}
      </View>

      {/* ================= REWARDS ================= */}
      <View
        style={{
          backgroundColor: "#1e293b",
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", marginBottom: 10 }}>
          Puncte de recompensă
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* POINTS */}
          <View>
            <Text style={{ color: "#22c55e", fontSize: 16 }}>
              {totalPoints}
            </Text>
            <Text style={{ color: "#94a3b8", fontSize: 12 }}>
              Puncte
            </Text>
          </View>

          {/* ORDERS */}
          <View>
            <Text style={{ color: "#22c55e", fontSize: 16 }}>
              {totalOrders}
            </Text>
            <Text style={{ color: "#94a3b8", fontSize: 12 }}>
              Comenzi
            </Text>
          </View>

          {/* MONEY */}
          <View>
            <Text style={{ color: "#22c55e", fontSize: 16 }}>
              {totalSpent}
            </Text>
            <Text style={{ color: "#94a3b8", fontSize: 12 }}>
              RON
            </Text>
          </View>

          {/* DONATIONS */}
          <View>
            <Text style={{ color: "#22c55e", fontSize: 16 }}>
              {totalDonations}
            </Text>
            <Text style={{ color: "#94a3b8", fontSize: 12 }}>
              Donații ❤️
            </Text>
          </View>
        </View>
      </View>

      {/* ================= CARDS ================= */}
      <Pressable
        style={menuItem}
        onPress={() => router.push("/cards")}
      >
        <View>
          <Text style={{ color: "white" }}>
            💳 Carduri salvate
          </Text>

          <Text style={subText}>
            Adaugă sau editează carduri
          </Text>
        </View>

        <Text style={arrow}>{">"}</Text>
      </Pressable>

      {/* ================= FACTURA ================= */}
      <Pressable
        style={menuItem}
        onPress={() => router.push("/facturi")}
      >
        <View>
          <Text style={{ color: "white" }}>
            📄 Informații factură
          </Text>

          <Text style={subText}>
            Completează sau editează factura
          </Text>
        </View>

        <Text style={arrow}>{">"}</Text>
      </Pressable>

      {/* ================= LOGOUT ================= */}
      <Pressable
        style={{
          marginTop: 20,
          padding: 14,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ef4444",
        }}
      >
        <Text
          style={{
            color: "#ef4444",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Deconectare
        </Text>
      </Pressable>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const input = {
  backgroundColor: "#0f172a",
  color: "white",
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
};

const label = {
  color: "#94a3b8",
  marginBottom: 4,
};

const buttonGreen = {
  backgroundColor: "#22c55e",
  padding: 14,
  borderRadius: 10,
};

const buttonGray = {
  backgroundColor: "#334155",
  padding: 14,
  borderRadius: 10,
};

const centerText = {
  color: "white",
  textAlign: "center" as const,
  fontWeight: "bold" as const,
};

const menuItem = {
  backgroundColor: "#1e293b",
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  flexDirection: "row" as const,
  justifyContent: "space-between" as const,
  alignItems: "center" as const,
};

const subText = {
  color: "#94a3b8",
  fontSize: 12,
};

const arrow = {
  color: "#94a3b8",
  fontSize: 16,
};