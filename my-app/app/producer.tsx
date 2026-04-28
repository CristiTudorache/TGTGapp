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
  const [requests, setRequests] = useState<any[]>([]);
  const [isBillingDone, setIsBillingDone] = useState(false);
  const [billingName, setBillingName] = useState("");
const [billingId, setBillingId] = useState("");
const [billingAddress, setBillingAddress] = useState("");
  const [toast, setToast] = useState({
  visible: false,
  title: "",
  message: "",
});
const [finance, setFinance] = useState<{
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
  totalProfit: number;
  products: Record<
    string,
    {
      name: string;
      sold: number;
      revenue: number;
      profit: number;
      commission: number;
    }
  >;
}>({
  totalOrders: 0,
  totalRevenue: 0,
  totalCommission: 0,
  totalProfit: 0,
  products: {},
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
  useEffect(() => {
  if (items.length === 0) return;

  let intervalTime = 20000;

  if (items.length === 1) intervalTime = 20000;
  else if (items.length === 2) intervalTime = 17500;
  else intervalTime = 15000;

  const interval = setInterval(() => {
    generateRequest();
  }, intervalTime);

  return () => clearInterval(interval);
}, [items]);

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
  /* ======= Producer accept or reject=======*/
  const updateRequestStatus = (id: string, status: "accepted" | "rejected") => {
  setRequests((prev) =>
    prev.map((r) =>
      r.id === id ? { ...r, status } : r
    )
  );
  if (status === "accepted") {
  const acceptedRequest = requests.find((r) => r.id === id);
  if (!acceptedRequest) return;

  const product = items.find(
    (i) => i.title === acceptedRequest.item
  );
  if (!product) return;

  const totalPrice =
    parseFloat(product.price) * acceptedRequest.qty;

  const commission = totalPrice * 0.1;
  const profit = totalPrice * 0.9;

  setFinance((prev) => {
    const existing = prev.products[product.title] || {
      name: product.title,
      sold: 0,
      revenue: 0,
      profit: 0,
      commission: 0,
    };

    return {
      totalOrders: prev.totalOrders + 1,
      totalRevenue: prev.totalRevenue + totalPrice,
      totalCommission: prev.totalCommission + commission,
      totalProfit: prev.totalProfit + profit,
      products: {
        ...prev.products,
        [product.title]: {
          name: product.title,
          sold: existing.sold + acceptedRequest.qty,
          revenue: existing.revenue + totalPrice,
          profit: existing.profit + profit,
          commission: existing.commission + commission,
        },
      },
    };
  });
}

  setToast({
    visible: true,
    title:
      status === "accepted"
        ? "Cerere acceptată ✅"
        : "Cerere refuzată ❌",
    message: "",
  });

  setTimeout(() => {
    setToast({ visible: false, title: "", message: "" });
  }, 2500);
};
  const generateRequest = () => {
  if (items.length === 0) return;

  const randomItem =
    items[Math.floor(Math.random() * items.length)];

  const randomName =
    names[Math.floor(Math.random() * names.length)];

  const qty = Math.ceil(Math.random() * 3);

  const template =
    prompts[Math.floor(Math.random() * prompts.length)];

  const message = template
    .replace("{item}", randomItem.title)
    .replace("{qty}", qty.toString());

  const newRequest = {
    id: Date.now().toString(),
    name: randomName,
    item: randomItem.title,
    qty,
    message,
    status: "pending",
  };

  setRequests((prev) => [newRequest, ...prev]);
};
  const names = [
  "Ana M.",
  "Vlad S.",
  "Cristian B.",
  "Ioana D.",
  "Andrei N.",
  "Maria A.",
  "Mihai Z.",
  "Mark K.",
  "Anca P",
];

const prompts = [
  "Bună! Aș dori {qty}x {item}, vă rog.",
  "Sunt interesat de {item}. Puteți pregăti {qty}?",
  "Mai aveți {item}? Vreau {qty} bucăți.",
  "Salut, vreau să comand {item} ({qty} buc), mulțumesc!",
  "Pot lua {qty} porții de {item}?",
];
const deleteItem = (id: string) => {
  setItems((prev) => prev.filter((item) => item.id !== id));
};
const startEditItem = (item: any) => {
  setTitle(item.title);
  setDesc(item.desc);
  setPrice(item.price);
  setQty(item.qty);
  setPickup(item.pickup);
  setImage(item.image);
  setAllergens(item.allergens || []);
  setProductType(item.type || "Oferta");

  setTab("create");
};
  const createItem = () => {
    if (!title || !desc || (productType !== "Gratis" && !price)) return;

    const newItem = {
  id: Date.now().toString(),
  title,
  desc,
  price: productType === "Gratis" ? "0" : price,
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
          fontWeight: "bold" as const,
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

        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" as const }}>
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

                <Text style={{ color: "white", fontWeight: "bold" as const }}>
                  {item.title}
                </Text>

                <Text style={{ color: "#22c55e" }}>
  {item.type === "Gratis" ? "GRATIS" : `${item.price} RON`}
</Text>

                <Text style={{ color: "#94a3b8" }}>
  Qty: {item.qty}
</Text>

<View
  style={{
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  }}
>
  {/* EDIT */}
  <Pressable
    onPress={() => startEditItem(item)}
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "#020617",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#334155",
    }}
  >
    <Text style={{ color: "#94a3b8", fontSize: 12 }}>
      ✏️ Editează
    </Text>
  </Pressable>

  {/* DELETE */}
  <Pressable
    onPress={() => deleteItem(item.id)}
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "#020617",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#334155",
    }}
  >
    <Text style={{ color: "#ef4444", fontSize: 12 }}>
      🗑 Șterge
    </Text>
  </Pressable>
</View>
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
            {productType !== "Gratis" && (
  <>
    <Text style={label}>Preț (RON)</Text>
    <TextInput
      value={price}
      onChangeText={setPrice}
      keyboardType="numeric"
      style={input}
    />
  </>
)}

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
{tab === "requests" && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" as const, marginBottom: 12 }}>
      Cereri primite
    </Text>

    <Text style={{ color: "#94a3b8", marginBottom: 12 }}>
      Cereri noi la fiecare ~15 minute platformă
    </Text>

    {requests.map((r) => (
      <View
        key={r.id}
        style={{
          backgroundColor: "#1e293b",
          padding: 14,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" as const }}>
          {r.name}
        </Text>

        <Text style={{ color: "#94a3b8", fontSize: 12 }}>
          {r.item} • Qty: {r.qty}
        </Text>

        <Text style={{ color: "#94a3b8", marginVertical: 6 }}>
          "{r.message}"
        </Text>

        <Text
          style={{
            color:
              r.status === "accepted"
                ? "#22c55e"
                : r.status === "rejected"
                ? "#ef4444"
                : "#94a3b8",
            marginBottom: 8,
          }}
        >
          {r.status === "pending"
            ? "în așteptare"
            : r.status === "accepted"
            ? "Acceptată"
            : "Refuzată"}
        </Text>

        {r.status === "pending" && (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              onPress={() => updateRequestStatus(r.id, "accepted")}
              style={{
                flex: 1,
                backgroundColor: "#22c55e",
                padding: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Acceptă</Text>
            </Pressable>

            <Pressable
              onPress={() => updateRequestStatus(r.id, "rejected")}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#334155",
                padding: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#94a3b8" }}>Refuză</Text>
            </Pressable>
          </View>
        )}
      </View>
    ))}
  </>
)}
{/* =============== finante ===============*/}
{tab === "finance" && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" as const, marginBottom: 12 }}>
      Finanțe
    </Text>

    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      <View style={card}>
        <Text style={labelSmall}>Comenzi acceptate</Text>
        <Text style={value}>{finance.totalOrders}</Text>
      </View>

      <View style={card}>
        <Text style={labelSmall}>Vânzări totale</Text>
        <Text style={value}>{finance.totalRevenue.toFixed(2)} RON</Text>
      </View>

      <View style={card}>
        <Text style={labelSmall}>Comision FoodLink (10%)</Text>
        <Text style={{ color: "#ef4444" }}>
          -{finance.totalCommission.toFixed(2)}
        </Text>
      </View>

      <View style={[card, { backgroundColor: "#22c55e20" }]}>
        <Text style={labelSmall}>Venitul tău (90%)</Text>
        <Text style={{ color: "#22c55e" }}>
          {finance.totalProfit.toFixed(2)}
        </Text>
      </View>
    </View>

    {Object.values(finance.products).length > 0 && (
      <View style={[card, { marginTop: 16 }]}>
        {(() => {
          const best = Object.values(finance.products).sort(
            (a, b) => b.sold - a.sold
          )[0];

          return (
            <>
              <Text style={{ color: "#f59e0b" }}>
                🏆 Cel mai vândut produs
              </Text>
              <Text style={{ color: "white", fontWeight: "bold"  as const}}>
                {best.name}
              </Text>
              <Text style={{ color: "#94a3b8" }}>
                {best.sold} vândute • {best.revenue.toFixed(2)} RON • {best.profit.toFixed(2)} RON profit
              </Text>
            </>
          );
        })()}
      </View>
    )}

    <View style={[card, { marginTop: 16 }]}>
      <Text style={{ color: "white", marginBottom: 8 }}>
        📊 Câștiguri per produs
      </Text>

      {Object.values(finance.products)
        .sort((a, b) => b.revenue - a.revenue)
        .map((p, index) => (
          <View key={p.name} style={{ marginBottom: 8 }}>
            <Text style={{ color: "#94a3b8" }}>
              #{index + 1} {p.name}
            </Text>

            <Text style={{ color: "#22c55e" }}>
              {p.profit.toFixed(2)} RON
            </Text>

            <Text style={{ color: "#ef4444", fontSize: 12 }}>
              -{p.commission.toFixed(2)} comision
            </Text>
          </View>
        ))}

      <View
  style={{
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#334155",
    paddingTop: 10,
  }}
>
        <Text style={{ color: "#22c55e" }}>
          TOTAL: {finance.totalProfit.toFixed(2)} RON
        </Text>
        <Text style={{ color: "#ef4444", fontSize: 12 }}>
          -{finance.totalCommission.toFixed(2)} RON
        </Text>
      </View>
    </View>
  </>
)}
        {/* ================= PROFILE ================= */}
        
{tab === "profile" && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" as const, marginBottom: 12 }}>
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
      <Text style={{ color: "white", fontWeight: "bold" as const, fontSize: 16 }}>
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
  { key: "requests", label: "Cereri" },
  { key: "finance", label: "Finanțe" },
  { key: "profile", label: "Profil" },
].map((t) => (
  <Pressable key={t.key} onPress={() => setTab(t.key)}>
    <View>
      <Text style={{ color: tab === t.key ? "#22c55e" : "#94a3b8" }}>
        {t.label}
      </Text>

      {/* 🔴 requests dot */}
      {t.key === "requests" &&
        requests.some((r) => r.status === "pending") && (
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

      {/* 🔴 profile dot */}
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
const card = {
  backgroundColor: "#1e293b",
  padding: 12,
  borderRadius: 12,
  flex: 1,
  minWidth: 150,
};

const labelSmall = {
  color: "#94a3b8",
  fontSize: 12,
};

const value = {
  color: "white",
  fontSize: 18,
  fontWeight: "bold" as const,
};