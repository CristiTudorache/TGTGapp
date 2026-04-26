import React from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useApp } from "../context/AppContext";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Profile from "./Profile";

import TopSection from "../components/TopSection";
import ClubCard from "../components/ClubCard";
import SponsoredCard from "../components/SponsoredCard";
import PickupTime from "../components/PickupTime";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "../components/toast";
const products = [
  {
    id: "1",
    title: "Cutie Legume Proaspete",
    desc: "Legume de sezon",
    price: "14.99 RON",
    distance: "1.2 km",
    pickupStart: 12,
    pickupEnd: 14,
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    id: "2",
    title: "Ouă de Fermă",
    desc: "Ouă naturale",
    price: "8.00 RON",
    distance: "3.5 km",
    pickupStart: 9,
    pickupEnd: 12,
    allergens: ["Eggs"],
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
  },
  {
    id: "3",
    title: "Pachet Lactate",
    desc: "Lapte și brânză",
    price: "12.50 RON",
    distance: "1.0 km",
    pickupStart: 14,
    pickupEnd: 18,
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
  },
  {
    id: "4",
    title: "Supă de Pui",
    desc: "Supă caldă",
    price: "11.00 RON",
    distance: "1.5 km",
    pickupStart: 11,
    pickupEnd: 15,
    allergens: ["Celery"],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  },
  {
    id: "5",
    title: "Salată Caesar",
    desc: "Salată fresh",
    price: "13.00 RON",
    distance: "0.9 km",
    pickupStart: 13,
    pickupEnd: 17,
    allergens: ["Dairy", "Eggs"],
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
  },
  {
    id: "6",
    title: "Pizza Margherita",
    desc: "Pizza clasică",
    price: "18.00 RON",
    distance: "2.0 km",
    pickupStart: 16,
    pickupEnd: 20,
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
  },
  {
  id: "7",
  title: "Paste Carbonara",
  desc: "Paste italiene",
  price: "16.50 RON",
  distance: "2.3 km",
  pickupStart: 15,
  pickupEnd: 19,
  allergens: ["Gluten", "Eggs", "Dairy"],
  image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
},
  {
    id: "8",
    title: "Burger Clasic",
    desc: "Carne + cartofi",
    price: "20.00 RON",
    distance: "2.8 km",
    pickupStart: 17,
    pickupEnd: 21,
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
  id: "9",
  title: "Croissant Unt",
  desc: "Proaspăt",
  price: "5.00 RON",
  distance: "0.5 km",
  pickupStart: 8,
  pickupEnd: 11,
  allergens: ["Gluten", "Dairy"],
  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
},
  {
    id: "10",
    title: "Smoothie Fructe",
    desc: "Fresh",
    price: "9.50 RON",
    distance: "1.7 km",
    pickupStart: 10,
    pickupEnd: 14,
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82",
  },
];

const clubProducts = [
  {
    id: "c1",
    title: "Sushi Premium",
    price: "29.99 RON",
    distance: "1.4 km",
    pickupStart: 19,
    pickupEnd: 23,
    allergens: ["Fish"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    id: "c2",
    title: "Mic Dejun Deluxe",
    price: "19.99 RON",
    distance: "0.8 km",
    pickupStart: 9,
    pickupEnd: 13,
    allergens: ["Eggs", "Dairy"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: "c3",
    title: "Box Vegan",
    price: "22.00 RON",
    distance: "1.1 km",
    pickupStart: 12,
    pickupEnd: 16,
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: "c4",
    title: "Tort Premium",
    price: "35.00 RON",
    distance: "2.2 km",
    pickupStart: 14,
    pickupEnd: 18,
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    id: "c5",
    title: "Smoothie Detox",
    price: "14.00 RON",
    distance: "0.9 km",
    pickupStart: 10,
    pickupEnd: 13,
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  },
  {
    id: "c6",
    title: "Cafea Specialty",
    price: "9.00 RON",
    distance: "1.0 km",
    pickupStart: 8,
    pickupEnd: 12,
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
];

const sponsored = [
  {
    id: "s1",
    title: "Brutăria Vecinului",
    desc: "Produse proaspete zilnic • 0.8 km",
    rating: "4.8",
    distance: "0.8 km",
    pickupStart: 7,
    pickupEnd: 13,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    id: "s2",
    title: "Cafeneaua de Colt",
    desc: "Cafea specialty • 1.2 km",
    rating: "4.9",
    distance: "1.2 km",
    pickupStart: 8,
    pickupEnd: 14,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    id: "s3",
    title: "FastFood Express",
    desc: "Burgeri & snacks • 1.5 km",
    rating: "4.7",
    distance: "1.5 km",
    pickupStart: 12,
    pickupEnd: 20,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
];

const storeProducts: any = {
  s1: [
    {
      id: "b1",
      title: "Pâine proaspătă",
      desc: "Coaptă azi",
      price: "4,50 RON",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    },
    {
      id: "b2",
      title: "Covrig cu susan",
      desc: "Crocanți",
      price: "1.50 RON",
      image: "https://images.unsplash.com/photo-1558030006-450675393462",
    },
    {
      id: "b3",
      title: "Croissant cu unt",
      desc: "Fraged",
      price: "2.50 RON",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=60",
    },
  ],

  s2: [
    {
      id: "c1",
      title: "Cappuccino",
      desc: "Cafea cu lapte",
      price: "9.00 RON",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: "c2",
      title: "Espresso",
      desc: "Shot intens",
      price: "6.00 RON",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    },
    {
      id: "c3",
      title: "Latte",
      desc: "Cremă fină",
      price: "10.00 RON",
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096",
    },
  ],

  s3: [
    {
      id: "f1",
      title: "Burger BBQ",
      desc: "Carne suculentă",
      price: "22.00 RON",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: "f2",
      title: "Cartofi prăjiți",
      desc: "Crispy",
      price: "8.00 RON",
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
    },
    {
      id: "f3",
      title: "Milkshake",
      desc: "Vanilie",
      price: "11.00 RON",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    },
  ],
};

const markers = [
  { id: "1", lat: 44.4268, lng: 26.1025 },
  { id: "2", lat: 44.4305, lng: 26.1102 },
  { id: "3", lat: 44.4212, lng: 26.0953 },
  { id: "4", lat: 44.4185, lng: 26.1204 },
  { id: "5", lat: 44.4351, lng: 26.0903 },
  { id: "6", lat: 44.4290, lng: 26.1150 },
  { id: "7", lat: 44.4242, lng: 26.1088 },
  { id: "8", lat: 44.4201, lng: 26.1122 },
  { id: "9", lat: 44.4325, lng: 26.0980 },
  { id: "10", lat: 44.4275, lng: 26.1185 },
];

export default function Main() {
  const params = useLocalSearchParams();
const { orders, notifications, markAllRead } = useApp();
  const [tab, setTab] = useState(
  (params.tab as string) || "home"
);
useEffect(() => {
  if (params.tab) {
    setTab(params.tab as string);
  }
}, [params.tab]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [clubModal, setClubModal] = useState(false);
  const [clubActive, setClubActive] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [previousTab, setPreviousTab] = useState("home");
  const [lastNotification, setLastNotification] = useState<any>(null);
  const [lastSeenNotificationId, setLastSeenNotificationId] = useState<string | null>(null);
const { factura } = useApp();
const hasFactura = !!factura; // first time only
const router = useRouter();
const [showDonation, setShowDonation] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
const [scrollX, setScrollX] = useState(0);
const [appTime, setAppTime] = useState(
  new Date().getHours() * 60 + new Date().getMinutes()
);

useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    setAppTime(now.getHours() * 60 + now.getMinutes());
  };

  updateTime(); // ✅ run instantly on mount

  const interval = setInterval(updateTime, 1000); // ✅ every second

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (notifications.length === 0) return;

  const latest = notifications[0];

  // ✅ prevent repeat toast
  if (latest.id !== lastSeenNotificationId) {
    setLastNotification(latest);
    setLastSeenNotificationId(latest.id);

    const timer = setTimeout(() => {
      setLastNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [notifications]);

const formatTime = (hour: number) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const formatted = hour % 12 === 0 ? 12 : hour % 12;

  return `${formatted}${suffix}`;
};

  const [userLocation, setUserLocation] = useState({
    latitude: 44.4268,
    longitude: 26.1025,
  });


  useEffect(() => {
    let sub: any;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (loc) => {
          setUserLocation(loc.coords);
        }
      );
    })();

    return () => {
      if (sub) sub.remove();
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const Card = ({ item }: any) => {
  const now = appTime;

// ✅ minutes since midnight resets automatically at 00:00
const end = item.pickupEnd ? item.pickupEnd * 60 : null;

// ✅ ONLY rule: closed if past pickupEnd
const isClosed = end !== null && now >= end;

  return (
    <Pressable
      onPress={() => {
  setPreviousTab(tab);   // ✅ SAVE WHERE YOU CAME FROM
  setSelectedProduct(item);
  setTab("product");
}}
    >
      <View
        style={{
          backgroundColor: "#1e293b",
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
            marginRight: 10,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {item.title}
          </Text>

          {item.desc && (
            <Text style={{ color: "#94a3b8" }}>{item.desc}</Text>
          )}

          <Text style={{ color: "#22c55e" }}>{item.price}</Text>

          {item.distance && (
            <Text style={{ color: "#94a3b8" }}>
              📍 {item.distance}
            </Text>
          )}

          {item.pickupStart !== undefined &&
            item.pickupEnd !== undefined && (
              <Text style={{ color: "#94a3b8" }}>
                📅 {formatTime(item.pickupStart)} - {formatTime(item.pickupEnd)}
              </Text>
          )}

          {/* ✅ STATUS */}
          <Text style={{ color: isClosed ? "#ef4444" : "#22c55e" }}>
            {isClosed ? "Închis" : "Deschis"}
          </Text>
        </View>

        <Pressable
          onPress={() => {
const itemString = JSON.stringify(item);

  if (!hasFactura) {
    router.push({
      pathname: "/facturi",
      params: { item: itemString },
    });
  } else {
    router.push({
      pathname: "/checkout",
      params: { item: itemString },
    });
  }
}}
        >
          <Text>
            {favorites.includes(item.id) ? "❤️" : "🤍"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};


  return (
    <SafeAreaView
  style={{ flex: 1, backgroundColor: "#0f172a" }}
  edges={["top", "bottom"]}
>
     <ScrollView
  contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
  showsVerticalScrollIndicator={false}
  onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
  scrollEventThrottle={16}
>
        <TopSection />
        
        <View
  style={{
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  }}
>
  <Pressable
    onPress={() => {
  setTab("notifications");
}}
  >
    <Text style={{ fontSize: 20 }}>🔔</Text>

    {notifications.some((n) => !n.read) && (
      <View
        style={{
          position: "absolute",
          top: -2,
          right: -2,
          width: 8,
          height: 8,
          backgroundColor: "red",
          borderRadius: 4,
        }}
      />
    )}
  </Pressable>
</View>
        {selectedStore && (
          <>
            <Pressable onPress={() => setSelectedStore(null)}>
              <Text style={{ color: "#22c55e", marginBottom: 10 }}>← Back</Text>
            </Pressable>

            <Text style={{ color: "white", fontSize: 20, marginBottom: 12 }}>
              {selectedStore.title}
            </Text>

            {storeProducts[selectedStore.id]?.map((item: any) => {
  const enrichedItem = {
    ...item,
    distance: selectedStore.distance,
    pickupStart: selectedStore.pickupStart,
    pickupEnd: selectedStore.pickupEnd,
  };

  return <Card key={item.id} item={enrichedItem} />;
})}
          </>
        )}

        {!selectedStore && tab === "home" && (
          <>
            <View style={{ flexDirection: "row", marginBottom: 12, backgroundColor: "#1e293b", borderRadius: 10, padding: 4 }}>
              <Pressable onPress={() => setViewMode("list")} style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ color: viewMode === "list" ? "#22c55e" : "white" }}>Listă</Text>
              </Pressable>
              <Pressable onPress={() => setViewMode("map")} style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ color: viewMode === "map" ? "#22c55e" : "white" }}>Hartă</Text>
              </Pressable>
            </View>

            {viewMode === "map" ? (
              <MapView
                style={{ height: 350, borderRadius: 12 }}
                initialRegion={{
                  latitude: 44.4268,
                  longitude: 26.1025,
                  latitudeDelta: 0.08,
                  longitudeDelta: 0.08,
                }}
              >
                {markers.map((m) => (
                  <Marker
                    key={m.id}
                    coordinate={{ latitude: m.lat, longitude: m.lng }}
                  >
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        backgroundColor: "red",
                        borderRadius: 7,
                        borderWidth: 2,
                        borderColor: "white",
                      }}
                    />
                  </Marker>
                ))}
              </MapView>
            ) : (
              <>
                <ClubCard onPress={() => clubActive ? setTab("club") : setClubModal(true)} />

                <Text style={{ color: "#94a3b8", marginBottom: 10 }}>
                  SPONSORIZAT
                </Text>

                <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
  scrollEventThrottle={16}
  style={{ marginBottom: 20 }}
>
                  {sponsored.map((item) => (
                    <Pressable key={item.id} onPress={() => setSelectedStore(item)}>
                      <SponsoredCard
  item={item}
  toggleFavorite={toggleFavorite}
  favorites={favorites}
/>
                    </Pressable>
                  ))}
                </ScrollView>
                <View
  style={{
    height: 4,
    backgroundColor: "#334155",
    borderRadius: 2,
    marginBottom: 20,
    overflow: "hidden",
  }}
>
  <View
    style={{
      height: 4,
      width: 80,
      backgroundColor: "white",
      borderRadius: 2,
      transform: [{ translateX: scrollX / 2 }],
    }}
  />
</View>

                {products.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </>
            )}
          </>
        )}

        {tab === "club" && !selectedStore && (
          <>
            <Pressable onPress={() => setTab("home")}>
              <Text style={{ color: "#22c55e", marginBottom: 10 }}>← Înapoi</Text>
            </Pressable>
            {clubProducts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </>
        )}
        {tab === "product" && selectedProduct && (
  <>
    {/* BACK BUTTON */}
    <Pressable onPress={() => setTab(previousTab)}>
      <Text style={{ color: "#22c55e", marginBottom: 10 }}>
        ← Înapoi
      </Text>
    </Pressable>

    {/* IMAGE */}
    <Image
      source={{ uri: selectedProduct.image }}
      style={{
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 10,
      }}
    />

    {/* INFO */}
    <Text style={{ color: "white", fontSize: 20 }}>
      {selectedProduct.title}
    </Text>

    <Text style={{ color: "#94a3b8", marginTop: 6 }}>
      {selectedProduct.desc}
    </Text>

    <Text style={{ color: "#22c55e", marginTop: 6 }}>
      {selectedProduct.price}
    </Text>

    <Text style={{ color: "#94a3b8", marginTop: 6 }}>
      📍 {selectedProduct.distance}
    </Text>

    {/* ALLERGENS */}
    {selectedProduct.allergens && (
      <Text style={{ color: "#94a3b8", marginTop: 6 }}>
        Alergeni: {selectedProduct.allergens.join(", ")}
      </Text>
    )}
    <View style={{ marginTop: 20 }}>
  <Pressable
    onPress={() => {
  const itemString = JSON.stringify(selectedProduct);

  if (!hasFactura) {
    router.push({
      pathname: "/facturi",
      params: { item: itemString },
    });
  } else {
    router.push({
      pathname: "/checkout",
      params: { item: itemString },
    });
  }
}}
    style={{
      backgroundColor: "#22c55e",
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
      Cumpără acum
    </Text>
  </Pressable>
</View>

{/* ================= DONATE BUTTON ================= */}
<Pressable
  onPress={() =>
  setShowDonation(showDonation ? null : selectedProduct.id)
}
  style={{
    borderWidth: 1,
    borderColor: "#22c55e",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  }}
>
  <Text style={{ color: "#22c55e", textAlign: "center", fontWeight: "bold" }}>
    ❤️ Donează o porție
  </Text>
</Pressable>

{/* ================= EXPAND ================= */}
{showDonation === selectedProduct.id && (
  <View
    style={{
      backgroundColor: "#1e293b",
      padding: 12,
      borderRadius: 10,
      marginTop: 8,
    }}
  >
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/checkout",
          params: {
            item: JSON.stringify(selectedProduct),
            donation: "true",
          },
        })
      }
      style={{
        backgroundColor: "#22c55e",
        padding: 12,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        Plătește donația
      </Text>
    </Pressable>
  </View>
)}

  </>
)}
        {/* ✅ UPDATED FAVORITES */}
        {tab === "favorites" && (
          <>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
              Favorite
            </Text>

            <Text style={{ color: "#94a3b8", marginBottom: 20 }}>
              Anunțurile tale salvate
            </Text>

            {favorites.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: 80 }}>
                <Text style={{ fontSize: 50, marginBottom: 10 }}>🤍</Text>

                <Text style={{ color: "#94a3b8", fontSize: 16 }}>
                  Nu ai încă favorite
                </Text>

                <Text style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
                  Apasă pe ❤️ pentru a salva
                </Text>
              </View>
            ) : (
              <>
  {/* normal products */}
  {products
    .filter((p) => favorites.includes(p.id))
    .map((item) => <Card key={item.id} item={item} />)}

  {/* club */}
  {clubProducts
    .filter((p) => favorites.includes(p.id))
    .map((item) => <Card key={item.id} item={item} />)}

  {/* store products */}
  {Object.values(storeProducts)
    .flat()
    .filter((p: any) => favorites.includes(p.id))
    .map((item: any) => <Card key={item.id} item={item} />)}

  {/* sponsored stores */}
  {sponsored
    .filter((p) => favorites.includes(p.id))
    .map((item) => (
      <View key={item.id} style={{ marginBottom: 12 }}>
        <SponsoredCard
  item={item}
  toggleFavorite={toggleFavorite}
  favorites={favorites}
/>
      </View>
    ))}
</>
            )}
          </>
        )}
{tab === "notifications" && (
  <>
    {/* ✅ BACK BUTTON */}
    <Pressable onPress={() => setTab("home")}>
      <Text style={{ color: "#22c55e", marginBottom: 10 }}>
        ← Înapoi
      </Text>
    </Pressable>

    <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
      Notificări
    </Text>

    {notifications.length === 0 ? (
      <Text style={{ color: "#94a3b8" }}>
        Nu ai notificări
      </Text>
    ) : (
      notifications.map((n) => (
        <View
          key={n.id}
          style={{
            backgroundColor: "#1e293b",
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {n.title}
          </Text>

          <Text style={{ color: "#94a3b8" }}>
            {n.message}
          </Text>
        </View>
      ))
    )}

    <Pressable
      onPress={markAllRead}
      style={{
        marginTop: 10,
        backgroundColor: "#334155",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        Marchează toate ca citite
      </Text>
    </Pressable>
  </>
)}
        {/* ✅ UPDATED ORDERS */}
        {tab === "orders" && (
  <>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
      FoodLink — Comenzi
    </Text>

    <Text style={{ color: "#94a3b8", marginBottom: 20 }}>
      Comenzi active și istoricul comenzilor
    </Text>

    {orders.length === 0 ? (
      <View style={{ alignItems: "center", marginTop: 80 }}>
        <Text style={{ fontSize: 50, marginBottom: 10 }}>📦</Text>

        <Text style={{ color: "#94a3b8", fontSize: 16 }}>
          Nicio comandă încă
        </Text>
      </View>
    ) : (
      orders.map((order) => (
        <View
          key={order.id}
          style={{
            backgroundColor: "#1e293b",
            padding: 14,
            borderRadius: 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: order.item.image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              marginRight: 10,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {order.item.title}
            </Text>

            <Text style={{ color: "#22c55e" }}>
              {order.item.price}
            </Text>

            <View
  style={{
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#22c55e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  }}
>
  <Text style={{ color: "white", fontSize: 12 }}>
    Rezervat
  </Text>
</View>
          </View>
        </View>
      ))
    )}
  </>
)}

        {tab === "profile" && <Profile />}
      </ScrollView>
      <View
  style={{
    position: "absolute",
    right: 4,
    top: 160,
    width: 5,
    height: 120,
    backgroundColor: "#334155",
    borderRadius: 2,
  }}
>
  <View
    style={{
      width: 5,
      height: 40,
      backgroundColor: "white",
      borderRadius: 2,
      transform: [{ translateY: scrollY / 5 }],
    }}
  />
</View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 12, borderTopWidth: 1, borderColor: "#1e293b" }}>
        {["Home", "Favorites", "Orders", "Profile"].map((t) => (
          <Pressable key={t} onPress={() => {
  const newTab = t.toLowerCase();
  setTab(newTab);

  if (newTab === "orders") {
    markAllRead(); // ✅ clears red dot
  }
}}>
  <View>
    <Text
      style={{
        color: tab === t.toLowerCase() ? "#22c55e" : "#94a3b8",
      }}
    >
      {t}
    </Text>

    {t === "Orders" && notifications.some(n => !n.read) && (
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

      <Modal visible={clubModal} transparent animationType="slide">
  <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
    <View style={{ backgroundColor: "#1e293b", padding: 20 }}>
      <Text style={{ color: "white", marginBottom: 10, fontSize: 16 }}>
  FoodLink Club — 10 RON / lună
</Text>

<Text style={{ color: "#94a3b8", marginBottom: 16 }}>
  Beneficii:
  {"\n"}• Acces produse exclusive
  {"\n"}• Economisești mai mult 💸
</Text>

<Pressable
  onPress={() => {
    // simulate payment success
    setClubActive(true);
    setClubModal(false);
    setTab("club");
  }}
  style={{
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
  }}
>
  <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
    Intră pentru 10 lei/lună →
  </Text>
</Pressable>

      {/* 👇 ADD THIS */}
      <Pressable
        onPress={() => setClubModal(false)}
        style={{
          backgroundColor: "#334155",
          padding: 14,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Anulează
        </Text>
      </Pressable>

    </View>
  </View>
</Modal>
{lastNotification && (
  <Toast
    title={lastNotification.title}
    message={lastNotification.message}
  />
)}
</SafeAreaView>
);
}
