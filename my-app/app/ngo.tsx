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
import { useApp } from "../context/AppContext";
import Toast from "../components/toast";
import { useRouter } from "expo-router";

/* ================= OFFERS ================= */

const offers = [
  {
    id: "1",
    title: "Pachet Fructe Surplus",
    desc: "Fructe mixte: mere, banane și portocale",
    qty: 10,
    distance: "2.1 km",
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
  },
  {
    id: "2",
    title: "Colecție Ierburi Aromatice",
    desc: "Busuioc, mentă, rozmarin",
    qty: 15,
    distance: "1.8 km",
    img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
  },
  {
    id: "3",
    title: "Cartofi Noi de Grădină",
    desc: "Proaspeți, ideali pentru gătit",
    qty: 20,
    distance: "3.2 km",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
  },
  {
    id: "4",
    title: "Ouă proaspete de fermă",
    desc: "Ouă naturale, crescute la fermă",
    qty: 12,
    distance: "1.9 km",
    img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
  },
  {
    id: "5",
    title: "Pâine cu Semințe",
    desc: "Pâine integrală proaspătă",
    qty: 4,
    distance: "0.8 km",
    img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  },
];

export default function NGO() {

  const [tab, setTab] = useState("register"); 
const [isVerified, setIsVerified] = useState(false);
const { ngoRequests, addNgoRequest, notifications, factura, setFactura } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState("");
  const [qty, setQty] = useState("");
  const router = useRouter();
  const [toast, setToast] = useState({
  visible: false,
  title: "",
  message: "",
});
  const [category, setCategory] = useState("Alimentar");
  const [orgName, setOrgName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [editingProfile, setEditingProfile] = useState(false);
  const isFacturaComplete =
  factura &&
  factura.name &&
  factura.address &&
  factura.city &&
  factura.phone;
  const collectedCount = ngoRequests.filter(
  (r) => r.status === "accepted"
).length;
  const inputStyle = {
  backgroundColor: "#1e293b",
  padding: 12,
  borderRadius: 10,
  marginTop: 12,
  color: "white",
};

  /* ================= TIME ================= */

  const [fakeTime, setFakeTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFakeTime((prev) => new Date(prev.getTime() + 60000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const [shownIds, setShownIds] = useState<string[]>([]);

useEffect(() => {
  if (!notifications.length) return;

  const last = notifications[0];

  if (
    last.title === "Cerere acceptată 🎉" &&
    !shownIds.includes(last.id)
  ) {
    setToast({
  visible: true,
  title: "Cerere acceptată 🎉",
  message: "Poți colecta produsele",
});

    setShownIds((prev) => [...prev, last.id]);

    setTimeout(() => setToast({ visible: false, title: "", message: "" }), 2500);
  }
}, [notifications]);

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
  const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};
  /* ================= SUBMIT ================= */

  const submitRequest = () => {
    if (!message || !qty) return;

    

addNgoRequest({
  title: category,
  message,
  qty,
});

// simulate approval after 10 sec

    setToast({
  visible: true,
  title: "Cerere trimisă!",
  message: "Producătorul va fi notificat",
});
    setMessage("");
    setQty("");

    setTimeout(() => setToast({ visible: false, title: "", message: "" }), 2500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView style={{ padding: 16 }}>

        {/* HEADER */}
        <Text style={{ color: "#94a3b8", fontSize: 12 }}>
          {formattedDate} • {formattedTime}
        </Text>

        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginTop: 4 }}>
          FoodLink
        </Text>

        {/* verification */}
        <View style={{
          backgroundColor: "#78350f",
          padding: 12,
          borderRadius: 10,
          marginTop: 12,
        }}>
          <Text style={{ color: "#facc15", fontWeight: "600" }}>
            Verificare în curs
          </Text>
          <Text style={{ color: "#fde68a", fontSize: 12 }}>
            Contul tău este în curs de verificare.
          </Text>
        </View>
        {tab === "register" && !isVerified && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "600", marginTop: 16 }}>
      Înregistrare ONG
    </Text>

    <View style={{ marginBottom: 10 }}>
  <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Organizație</Text>
  <TextInput
    value={orgName}
    onChangeText={setOrgName}
    placeholder="Nume organizație"
    placeholderTextColor="#64748b"
    style={{
      backgroundColor: "#020617",
      borderRadius: 10,
      padding: 12,
      color: "white",
      borderWidth: 1,
      borderColor: "#334155",
    }}
  />
</View>

    <View style={{ marginBottom: 10 }}>
  <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Email</Text>
  <TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="Email"
    placeholderTextColor="#64748b"
    style={{
      backgroundColor: "#020617",
      borderRadius: 10,
      padding: 12,
      color: "white",
      borderWidth: 1,
      borderColor: "#334155",
    }}
  />
</View>

    <View style={{ marginBottom: 10 }}>
  <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Telefon</Text>
  <TextInput
    value={phone}
    onChangeText={setPhone}
    placeholder="Telefon"
    placeholderTextColor="#64748b"
    style={{
      backgroundColor: "#020617",
      borderRadius: 10,
      padding: 12,
      color: "white",
      borderWidth: 1,
      borderColor: "#334155",
    }}
  />
</View>

    <View style={{ marginBottom: 10 }}>
  <Text style={{ color: "#94a3b8", marginBottom: 4 }}>Adresă</Text>
  <TextInput
    value={address}
    onChangeText={setAddress}
    placeholder="Adresă"
    placeholderTextColor="#64748b"
    style={{
      backgroundColor: "#020617",
      borderRadius: 10,
      padding: 12,
      color: "white",
      borderWidth: 1,
      borderColor: "#334155",
    }}
  />
</View>

    <Pressable
      onPress={() => {
  if (!orgName || !email || !phone || !address) {
    alert("Completează toate câmpurile");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Email invalid");
    return;
  }

  setIsVerified(true);
  setTab("home");
}}
      style={{
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 12,
        marginTop: 20,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        Trimite pentru verificare
      </Text>
    </Pressable>
  </>
)}
        {/* ================= HOME ================= */}
        {tab === "home" && isVerified && !selectedOffer && (
          <>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
              <View style={{ flex: 1, backgroundColor: "#1e293b", padding: 16, borderRadius: 12, alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>5</Text>
                <Text style={{ color: "#94a3b8" }}>Disponibile</Text>
              </View>

              <View style={{ flex: 1, backgroundColor: "#1e293b", padding: 16, borderRadius: 12, alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>
  {collectedCount}
</Text>
                <Text style={{ color: "#94a3b8" }}>Colectate</Text>
              </View>
            </View>

            <Text style={{ color: "#94a3b8", marginTop: 16 }}>
              MÂNCARE DONATĂ DISPONIBILĂ
            </Text>

            {offers.map((o) => (
              <Pressable
                key={o.id}
                onPress={() => setSelectedOffer(o)}
                style={{
                  backgroundColor: "#1e293b",
                  borderRadius: 12,
                  padding: 12,
                  marginTop: 10,
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Image source={{ uri: o.img }} style={{ width: 70, height: 70, borderRadius: 10 }} />

                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white", fontWeight: "600" }}>{o.title}</Text>
                  <Text style={{ color: "#94a3b8", fontSize: 12 }}>{o.desc}</Text>
                  <Text style={{ color: "#22c55e" }}>Gratis</Text>
                  <Text style={{ color: "#94a3b8", fontSize: 12 }}>
                    {o.distance} • Qty: {o.qty}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
          
        )}
        {/* ================= OFFER details ================= */}
{tab === "home" && selectedOffer && !isRequesting && (
  <>
    <Pressable onPress={() => setSelectedOffer(null)}>
      <Text style={{ color: "#22c55e", marginTop: 16 }}>
        ← Înapoi
      </Text>
    </Pressable>

    <Image
      source={{ uri: selectedOffer.img }}
      style={{ width: "100%", height: 160, borderRadius: 12, marginTop: 10 }}
    />

    <Text style={{ color: "white", fontSize: 20, fontWeight: "600", marginTop: 10 }}>
      {selectedOffer.title}
    </Text>

    <Text style={{ color: "#94a3b8", marginTop: 4 }}>
      {selectedOffer.desc}
    </Text>

    <Text style={{ color: "#94a3b8", marginTop: 4 }}>
      {selectedOffer.distance} • Qty: {selectedOffer.qty}
    </Text>

    {/* order button */}
    <Pressable
  onPress={() => setIsRequesting(true)}
      style={{
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 12,
        marginTop: 16,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        Colectează
      </Text>
    </Pressable>
  </>
)}
{/* ================= screen for request ================= */}
{tab === "home" && selectedOffer && isRequesting && (
  <>
    <Pressable onPress={() => setIsRequesting(false)}>
      <Text style={{ color: "#22c55e", marginTop: 16 }}>
        ← Înapoi
      </Text>
    </Pressable>

    <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
      Solicitare pentru {selectedOffer.title}
    </Text>

    <Text style={{ color: "#94a3b8", marginTop: 16 }}>Mesaj</Text>
    <TextInput
      placeholder="Descrie nevoia..."
      placeholderTextColor="#94a3b8"
      value={message}
      onChangeText={setMessage}
      style={{
        backgroundColor: "#1e293b",
        padding: 12,
        borderRadius: 10,
        marginTop: 6,
        color: "white",
        height: 100,
      }}
      multiline
    />

    <Text style={{ color: "#94a3b8", marginTop: 16 }}>Cantitate</Text>
    <TextInput
      placeholder="Cantitate"
      placeholderTextColor="#94a3b8"
      value={qty}
      onChangeText={setQty}
      keyboardType="numeric"
      style={{
        backgroundColor: "#1e293b",
        padding: 12,
        borderRadius: 10,
        marginTop: 6,
        color: "white",
      }}
    />

    <Pressable
      onPress={() => {
        submitRequest();
        setIsRequesting(false);
        setSelectedOffer(null);
      }}
      style={{
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 12,
        marginTop: 16,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        Trimite solicitare
      </Text>
    </Pressable>
  </>
)}

        {/* ================= cereri ================= */}
        {tab === "cereri" && isVerified && (
          <>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "600", marginTop: 16 }}>
              Solicită mâncare gratuită
            </Text>

            <Text style={{ color: "#94a3b8", marginBottom: 16 }}>
              Trimite cereri gratuite către producători
            </Text>

            <Text style={{ color: "#94a3b8" }}>Categorie</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {["Băuturi", "Panificație", "Produse alimentare", "Restaurant", "Fermier"].map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setCategory(c)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: category === c ? "#22c55e" : "#334155",
                    backgroundColor: category === c ? "#22c55e20" : "#1e293b",
                  }}
                >
                  <Text style={{
                    color: category === c ? "#22c55e" : "#94a3b8",
                    fontWeight: "500",
                  }}>
                    {c}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={{ color: "#94a3b8", marginTop: 16 }}>Mesaj</Text>

            <TextInput
              placeholder="Descrie nevoia..."
              placeholderTextColor="#94a3b8"
              multiline
              value={message}
              onChangeText={setMessage}
              style={{
                backgroundColor: "#1e293b",
                padding: 12,
                borderRadius: 10,
                marginTop: 6,
                color: "white",
                height: 100,
                textAlignVertical: "top",
              }}
            />

            <Text style={{ color: "#94a3b8", marginTop: 16 }}>Cantitate</Text>

            <TextInput
              placeholder="Cantitate"
              placeholderTextColor="#94a3b8"
              value={qty}
              onChangeText={setQty}
              keyboardType="numeric"
              style={{
                backgroundColor: "#1e293b",
                padding: 12,
                borderRadius: 10,
                marginTop: 6,
                color: "white",
              }}
            />

            <Pressable
              onPress={submitRequest}
              style={{
                backgroundColor: "#22c55e",
                padding: 14,
                borderRadius: 12,
                marginTop: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Trimite cererea (gratis)
              </Text>
            </Pressable>

            {/* cererile tale  */}
            <Text style={{ color: "#94a3b8", marginTop: 24 }}>
              CERERILE TALE
            </Text>

            {ngoRequests.map((r) => (
              <View
                key={r.id}
                style={{
                  backgroundColor: "#1e293b",
                  padding: 14,
                  borderRadius: 12,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white" }}>
                    {r.message}
                  </Text>
                  <Text style={{ color: "#94a3b8", fontSize: 12 }}>
                    Qty: {r.qty} • Gratis
                  </Text>
                </View>

                <View style={{
                  backgroundColor: r.status === "pending" ? "#facc1520" : "#22c55e20",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}>
                  <Text style={{
                    color: r.status === "pending" ? "#facc15" : "#22c55e",
                    fontSize: 12,
                    fontWeight: "600",
                  }}>
                    {r.status === "pending" ? "în așteptare" : "acceptat"}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* PROFILE */}
        {tab === "profile" && isVerified && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "600", marginTop: 16 }}>
      Profil
    </Text>

    <View
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 14,
        padding: 16,
        marginTop: 16,
      }}
    >
      {editingProfile ? (
        <>
          <TextInput
            value={orgName}
            onChangeText={setOrgName}
            placeholder="Nume organizație"
            placeholderTextColor="#94a3b8"
            style={inputStyle}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            style={inputStyle}
          />

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefon"
            placeholderTextColor="#94a3b8"
            style={inputStyle}
          />

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Adresă"
            placeholderTextColor="#94a3b8"
            style={inputStyle}
          />

          <Pressable
            onPress={() => setEditingProfile(false)}
            style={{
              backgroundColor: "#22c55e",
              padding: 12,
              borderRadius: 10,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Salvează</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={{ color: "white", fontWeight: "600" }}>
            {orgName || "Nume ONG"}
          </Text>

          <Text style={{ color: "#94a3b8", fontSize: 12 }}>
            {email}
          </Text>

          <Text style={{ color: "#94a3b8", fontSize: 12 }}>
            {phone}
          </Text>

          <Text style={{ color: "#94a3b8", fontSize: 12 }}>
            {address}
          </Text>

          <Pressable
            onPress={() => setEditingProfile(true)}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: "#22c55e" }}>
              ✏️ Editează profil
            </Text>
          </Pressable>
        </>
      )}
    </View>

    {/* FACTURA */}
    <Pressable
      onPress={() => setTab("factura")}
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 12,
        padding: 14,
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: "white", fontWeight: "500" }}>
          Informații factură
        </Text>

        <Text style={{ color: "#94a3b8", fontSize: 12 }}>
          {isFacturaComplete ? "Completat" : "Necompletat"}
        </Text>
      </View>

      <Text style={{ color: "#94a3b8" }}>›</Text>
    </Pressable>

    {/* LOGOUT */}
    <Pressable
      onPress={() => {
        setIsVerified(false);
        setTab("register");
        router.replace("/");
      }}
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
  </>
)}
{tab === "factura" && (
  <>
    <Pressable onPress={() => setTab("profile")}>
      <Text style={{ color: "#22c55e", marginTop: 16 }}>
        ← Înapoi
      </Text>
    </Pressable>

    <Text style={{ color: "white", fontSize: 22, fontWeight: "600", marginTop: 16 }}>
      Informații factură
    </Text>

    <TextInput
  placeholder="Nume"
  placeholderTextColor="#94a3b8"
  style={inputStyle}
  value={factura?.name || ""}
  onChangeText={(text) =>
    setFactura({
      ...(factura || {}),
      name: text,
    })
  }
/>

    <TextInput
  placeholder="Adresă"
  placeholderTextColor="#94a3b8"
  style={inputStyle}
  value={factura?.address || ""}
  onChangeText={(text) =>
    setFactura({
      ...(factura || {}),
      address: text,
    })
  }
/>

    <TextInput
  placeholder="Oraș"
  placeholderTextColor="#94a3b8"
  style={inputStyle}
  value={factura?.city || ""}
  onChangeText={(text) =>
    setFactura({
      ...(factura || {}),
      city: text,
    })
  }
/>

    <TextInput
  placeholder="Telefon"
  placeholderTextColor="#94a3b8"
  style={inputStyle}
  value={factura?.phone || ""}
  onChangeText={(text) =>
    setFactura({
      ...(factura || {}),
      phone: text,
    })
  }
/>

    <Pressable
      onPress={() => setTab("profile")}
      style={{
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 12,
        marginTop: 16,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        Salvează
      </Text>
    </Pressable>
  </>
)}

      </ScrollView>

      {/* nav */}
{isVerified && (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 12,
      borderTopWidth: 1,
      borderColor: "#1e293b",
    }}
  >
    {[
      { key: "home", label: "Home" },
      { key: "cereri", label: "Cereri" },
      { key: "profile", label: "Profil" },
    ].map((t) => (
      <Pressable
        key={t.key}
        onPress={() => {
          setTab(t.key);
          setSelectedOffer(null);
          setIsRequesting(false);
        }}
      >
        <View style={{ alignItems: "center", position: "relative" }}>
  <Text
    style={{
      color: tab === t.key ? "#22c55e" : "#94a3b8",
    }}
  >
    {t.label}
  </Text>

  {t.key === "profile" && !isFacturaComplete && (
    <View
      style={{
        position: "absolute",
        top: -2,
        right: -10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ef4444",
      }}
    />
  )}
</View>
      </Pressable>
    ))}
  </View>
)}

      {/* toast popups */}
      {toast.visible && (
  <Toast
    title={toast.title}
    message={toast.message}
  />
)}
    </SafeAreaView>
  );
}