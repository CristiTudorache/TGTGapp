import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useApp } from "../context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BackButton from "../components/BackButton";

const rewards = [
  {
    id: "r1",
    title: "Cafea Gratuită",
    points: 50,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    id: "r2",
    title: "Coș Fructe Premium",
    points: 100,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
  },
  {
    id: "r3",
    title: "Voucher 20 RON",
    points: 200,
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  },
  {
    id: "r4",
    title: "Mini Pizza Margherita",
    points: 25,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
  },
  {
    id: "r5",
    title: "Smoothie Detox",
    points: 40,
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82",
  },
  {
    id: "r6",
    title: "Pâine Artizanală",
    points: 75,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    id: "r7",
    title: " Friptură de Vită cu Cartofi Prăjiți",
    points: 35,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
  },
  {
    id: "r8",
    title: "Pachet Brânzeturi",
    points: 150,
    image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b",
  },
  {
    id: "r9",
    title: "Desert Surprise",
    points: 60,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: "r10",
    title: "Mic Dejun Healthy",
    points: 80,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  },
];

export default function Rewards() {
  const router = useRouter();
  const { points, usePoints, addOrder } = useApp();

  const handleBuy = (item: any) => {
    if (points < item.points) return;

    usePoints(item.points);

    addOrder({
      id: Date.now().toString(),
      item: {
        ...item,
        price: "Plătit cu puncte",
      },
      date: Date.now(),
    });

    router.push({
      pathname: "/main",
      params: { tab: "orders" },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        <BackButton />

        <Text style={{ color: "white", fontSize: 22, marginBottom: 6 }}>
          Magazin Recompense
        </Text>

        <Text style={{ color: "#94a3b8", marginBottom: 20 }}>
          Ai {points} puncte disponibile
        </Text>

        {rewards.map((item) => {
          const canBuy = points >= item.points;

          return (
            <View
              key={item.id}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: 12,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: 140, width: "100%" }}
              />

              <View style={{ padding: 12 }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  {item.title}
                </Text>

                <Text style={{ color: "#fbbf24", marginTop: 4 }}>
                  ⭐ {item.points} puncte
                </Text>

                <Pressable
                  onPress={() => handleBuy(item)}
                  style={{
                    backgroundColor: canBuy ? "#22c55e" : "#334155",
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {canBuy ? "Cumpără" : "Puncte insuficiente"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}