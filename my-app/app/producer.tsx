import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Toast from "../components/toast";
import { router } from "expo-router";

export default function Producer() {
  const [tab, setTab] = useState("home");
  const [isSetupDone, setIsSetupDone] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [type, setType] = useState<"farmer" | "shop" | null>(null);

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

  const [items, setItems] = useState<any[]>([]);
  const [isBillingDone, setIsBillingDone] = useState(false);
  const [billingName, setBillingName] = useState("");
const [billingId, setBillingId] = useState("");
const [billingAddress, setBillingAddress] = useState("");
  const [toast, setToast] = useState({
  visible: false,
  title: "",
  message: "",
});

  /* ================= FORM ================= */

  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("1");
  const [pickup, setPickup] = useState("");
  const [productType, setProductType] = useState("Oferta");
  const [allergens, setAllergens] = useState<string[]>([]);

  const allergenList = [
    "Nuts",
    "Dairy",
    "Gluten",
    "Soy",
    "Eggs",
    "Shellfish",
    "Sesame",
  ];

  /* ================= TIME ================= */

  const [fakeTime, setFakeTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFakeTime((prev) => new Date(prev.getTime() + 60000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rawDate = fakeTime.toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedDate =
    rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  const formattedTime = fakeTime.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* ================= IMAGE PICKER ================= */

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* ================= CREATE ================= */

  const toggleAllergen = (a: string) => {
    setAllergens((prev) =>
      prev.includes(a)
        ? prev.filter((x) => x !== a)
        : [...prev, a]
    );
  };

  const createItem = () => {
    if (!title || !desc || !price) return;

    const newItem = {
      id: Date.now().toString(),
      title,
      desc,
      price,
      qty,
      pickup,
      image,
      allergens,
      type: productType,
    };

    setItems((prev) => [newItem, ...prev]);

    // reset
    setTitle("");
    setDesc("");
    setPrice("");
    setQty("1");
    setPickup("");
    setImage(null);
    setAllergens([]);

    setToast({
  visible: true,
  title: "Anunț creat 🎉",
  message: "Anunțul tău este acum vizibil",
});

setTimeout(() => {
  setToast({ visible: false, title: "", message: "" });
}, 2500);

setTab("home");
  };

  if (!isSetupDone) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 24,
      }}
    >
      {/* BACK */}
      <Pressable style={{ marginBottom: 20 }}>
        <Text style={{ color: "#94a3b8", fontSize: 18 }}>←</Text>
      </Pressable>

      {/* TITLE */}
      <Text
        style={{
          color: "white",
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 6,
        }}
      >
        Configurează profilul
      </Text>

      <Text style={{ color: "#94a3b8", marginBottom: 24 }}>
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
        style={input}
      />

      {/* ADDRESS */}
      <Text style={label}>Adresă / Zonă</Text>
      <TextInput
        placeholder="ex. Sector 3, Drumul Taberei"
        placeholderTextColor="#64748b"
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
      <Pressable
        onPress={() => {
          if (!name || !email || !type) {
            alert("Completează toate câmpurile");
            return;
          }

          if (!validateEmail(email)) {
            alert("Email invalid");
            return;
          }

          setIsSetupDone(true);
        }}
        style={{
          backgroundColor: "#22c55e",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          Continuă
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView style={{ padding: 16 }}>

        {/* HEADER */}
        <Text style={{ color: "#94a3b8", fontSize: 12 }}>
          {formattedDate} • {formattedTime}
        </Text>

        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          FoodLink
        </Text>

        {/* ================= HOME ================= */}
        {tab === "home" && (
          <>
            <Pressable
              onPress={() => setTab("create")}
              style={{
                borderWidth: 1,
                borderColor: "#334155",
                borderStyle: "dashed",
                padding: 20,
                borderRadius: 12,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#94a3b8" }}>
                + Creează anunț nou
              </Text>
            </Pressable>

            {items.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: "#1e293b",
                  padding: 14,
                  borderRadius: 12,
                  marginTop: 12,
                }}
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 120, borderRadius: 10, marginBottom: 10 }}
                  />
                )}

                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item.title}
                </Text>

                <Text style={{ color: "#22c55e" }}>
                  {item.price} RON
                </Text>

                <Text style={{ color: "#94a3b8" }}>
                  Qty: {item.qty}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* ================= CREATE ================= */}
        {tab === "create" && (
          <>
            <Pressable onPress={() => setTab("home")}>
              <Text style={{ color: "#22c55e", marginTop: 16 }}>
                ← Înapoi
              </Text>
            </Pressable>

            <Text style={{ color: "white", fontSize: 22, marginTop: 10 }}>
              Creează anunț
            </Text>

            {/* IMAGE */}
            <Pressable
              onPress={pickImage}
              style={{
                borderWidth: 1,
                borderColor: "#334155",
                borderStyle: "dashed",
                padding: 40,
                borderRadius: 12,
                marginTop: 16,
                alignItems: "center",
              }}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 150 }}
                />
              ) : (
                <Text style={{ color: "#94a3b8" }}>
                  Adaugă fotografie
                </Text>
              )}
            </Pressable>

            {/* TITLE */}
            <Text style={label}>Titlu</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={input}
            />

            {/* DESC */}
            <Text style={label}>Descriere</Text>
            <TextInput
              value={desc}
              onChangeText={setDesc}
              style={[input, { height: 100 }]}
              multiline
            />

            {/* TYPE */}
            <Text style={label}>Tip</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {["Oferta", "Pachet", "Gratis"].map((t) => (
                <Pressable
                  key={t}
                  onPress={() => setProductType(t)}
                  style={[
                    typeBtn,
                    productType === t && activeType,
                  ]}
                >
                  <Text style={productType === t ? activeText : normalText}>
                    {t}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* PRICE */}
            <Text style={label}>Preț (RON)</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={input}
            />

            {/* QTY */}
            <Text style={label}>Cantitate</Text>
            <TextInput
              value={qty}
              onChangeText={setQty}
              keyboardType="numeric"
              style={input}
            />

            {/* ALLERGENS */}
            <Text style={label}>Alergeni</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {allergenList.map((a) => (
                <Pressable
                  key={a}
                  onPress={() => toggleAllergen(a)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: allergens.includes(a)
                      ? "#22c55e20"
                      : "#1e293b",
                  }}
                >
                  <Text
                    style={{
                      color: allergens.includes(a)
                        ? "#22c55e"
                        : "#94a3b8",
                    }}
                  >
                    {a}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* PICKUP */}
            <Text style={label}>Timp ridicare</Text>
            <TextInput
              placeholder="ex. Azi 16-18"
              placeholderTextColor="#94a3b8"
              value={pickup}
              onChangeText={setPickup}
              style={input}
            />

            {/* SUBMIT */}
            <Pressable onPress={createItem} style={button}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                Publică anunțul
              </Text>
            </Pressable>
          </>
        )}
        {/* ================= BILLING ================= */}
{tab === "billing" && (
  <>
    <Pressable onPress={() => setTab("profile")}>
      <Text style={{ color: "#22c55e", marginBottom: 12 }}>
        ← Înapoi
      </Text>
    </Pressable>

    <Text style={{ color: "white", fontSize: 22, marginBottom: 16 }}>
      Informații factură
    </Text>

    <TextInput
  placeholder="Nume firmă / persoană"
  placeholderTextColor="#94a3b8"
  value={billingName}
  onChangeText={setBillingName}
  style={input}
/>

<TextInput
  placeholder="CUI / CNP"
  placeholderTextColor="#94a3b8"
  value={billingId}
  onChangeText={setBillingId}
  style={input}
/>

<TextInput
  placeholder="Adresă facturare"
  placeholderTextColor="#94a3b8"
  value={billingAddress}
  onChangeText={setBillingAddress}
  style={input}
/>

    <Pressable
      onPress={() => {
        setIsBillingDone(true);
        setTab("profile");
      }}
      style={button}
    >
      <Text style={{ color: "white" }}>
        Salvează
      </Text>
    </Pressable>
  </>
)}
        {/* ================= PROFILE ================= */}
{tab === "profile" && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
      Profil
    </Text>

    {/* PROFILE CARD */}
    <View
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        {name || "Nume"}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 4 }}>
        Producer • {type === "farmer" ? "Farmer" : "Shop"}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 6 }}>
        📧 {email || "email@gmail.com"}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 4 }}>
        📍 București
      </Text>
    </View>

    {/* FACTURI */}
    <Pressable
  onPress={() => setTab("billing")}
  style={{
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
alignItems: "center",
  }}
>
      <View style={{ flex: 1 }}>
  <Text style={{ color: "white" }}>
    📄 Informații factură
  </Text>

  <Text style={{ color: "#94a3b8", fontSize: 12 }}>
    {isBillingDone ? "Completat" : "Necompletat"}
  </Text>
</View>

<View style={{ marginLeft: "auto" }}>
  <Text style={{ color: "#94a3b8", fontSize: 18 }}>
    ›
  </Text>
</View>

<Text style={{ color: "#94a3b8", fontSize: 18, marginLeft: 10 }}>
</Text>

      <Text style={{ color: "#94a3b8", fontSize: 12 }}>
</Text>
    </Pressable>

    {/* LOGOUT */}
    <Pressable
  onPress={() => {
  router.replace("/");
}}
  style={{
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 10,
  }}
>
  <Text style={{ color: "#ef4444", textAlign: "center" }}>
    ⎋ Deconectare
  </Text>
</Pressable>
  </>
)}
      </ScrollView>

      {/* NAV */}
      <View style={nav}>
        {[
  { key: "home", label: "Anunțuri" },
  { key: "create", label: "Creează" },
  { key: "profile", label: "Profil" },
].map((t) => (
  <Pressable key={t.key} onPress={() => setTab(t.key)}>
    <View>
      <Text style={{ color: tab === t.key ? "#22c55e" : "#94a3b8" }}>
        {t.label}
      </Text>

      {t.key === "profile" && !isBillingDone && (
        <View
          style={{
            position: "absolute",
            top: -4,
            right: -10,
            width: 8,
            height: 8,
            backgroundColor: "red",
            borderRadius: 4,
          }}
        />
      )}
    </View>
  </Pressable>
))}
      </View>
      {toast.visible && (
  <Toast title={toast.title} message={toast.message} />
)}
    </SafeAreaView>
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
  marginTop: 12,
};

const button = {
  backgroundColor: "#22c55e",
  padding: 14,
  borderRadius: 12,
  marginTop: 20,
  alignItems: "center" as const,
};

const nav = {
  flexDirection: "row" as const,
  justifyContent: "space-around" as const,
  padding: 12,
  borderTopWidth: 1,
  borderColor: "#1e293b",
};

const typeBtn = {
  flex: 1,
  padding: 10,
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
};

const normalText = {
  color: "#94a3b8",
};