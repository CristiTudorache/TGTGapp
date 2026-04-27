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

  const { orders, donations, points } = useApp();

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");

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

  // ================= STATS =================

  const totalOrders = orders.length;
  const totalDonations = donations.length;

  // ⭐ progress bar (100 pts = full)
  const progress = Math.min(points / 100, 1);

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
      <Text style={title}>Profil</Text>

      {/* ================= PROFILE CARD ================= */}
      <View style={card}>
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
              {user?.name}
            </Text>

            <Text style={{ color: "#94a3b8", marginBottom: 4 }}>
              {user?.email}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              {user?.location}
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
      <View style={card}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Puncte de recompensă
        </Text>

        {/* ⭐ POINTS */}
        <Text
          style={{
            color: "#22c55e",
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {points} puncte
        </Text>

        {/* 📊 PROGRESS BAR */}
        <View
          style={{
            height: 6,
            backgroundColor: "#334155",
            borderRadius: 3,
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              height: 6,
              width: `${progress * 100}%`,
              backgroundColor: "#22c55e",
            }}
          />
        </View>

        <Text style={{ color: "#94a3b8", fontSize: 12 }}>
          Primești puncte din comenzi și contestații aprobate
        </Text>

        {/* STATS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Stat label="Comenzi" value={totalOrders} />
          <Stat label="Donații ❤️" value={totalDonations} />
        </View>
      </View>

      {/* ================= MENU ================= */}

      <MenuItem
        title="🎁 Magazin Recompense"
        subtitle="Folosește punctele pentru premii"
        onPress={() => router.push("/rewards")}
      />

      <MenuItem
        title="💳 Carduri salvate"
        subtitle="Adaugă sau editează carduri"
        onPress={() => router.push("/cards")}
      />

      <MenuItem
        title="📄 Informații factură"
        subtitle="Completează sau editează factura"
        onPress={() => router.push("/facturi")}
      />

      {/* LOGOUT */}
      <Pressable
  onPress={() => router.replace("/")}
  style={logout}
>
  <Text style={logoutText}>Deconectare</Text>
</Pressable>
    </ScrollView>
  );
}

/* ================= COMPONENTS ================= */

const Stat = ({ label, value }: any) => (
  <View>
    <Text style={{ color: "#22c55e", fontSize: 16 }}>{value}</Text>
    <Text style={{ color: "#94a3b8", fontSize: 12 }}>{label}</Text>
  </View>
);

const MenuItem = ({ title, subtitle, onPress }: any) => (
  <Pressable style={menuItem} onPress={onPress}>
    <View>
      <Text style={{ color: "white" }}>{title}</Text>
      <Text style={subText}>{subtitle}</Text>
    </View>
    <Text style={arrow}>{">"}</Text>
  </Pressable>
);

/* ================= STYLES ================= */

const title = {
  color: "white",
  fontSize: 22,
  marginBottom: 20,
  fontWeight: "bold" as const,
};

const card = {
  backgroundColor: "#1e293b",
  padding: 16,
  borderRadius: 12,
  marginBottom: 20,
};

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

const logout = {
  marginTop: 20,
  padding: 14,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#ef4444",
};

const logoutText = {
  color: "#ef4444",
  textAlign: "center" as const,
  fontWeight: "bold" as const,
};