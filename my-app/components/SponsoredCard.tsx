import { View, Text, Image, Pressable } from "react-native";

export default function SponsoredCard({ item, toggleFavorite, favorites }: any) {
  return (
    <View
      style={{
        width: 180,
        backgroundColor: "#1e293b",
        borderRadius: 14,
        marginRight: 12,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 100 }}
      />

      <View style={{ padding: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {item.title}
        </Text>

        <Text style={{ color: "#94a3b8", fontSize: 12 }}>
          {item.desc}
        </Text>

        <Text style={{ color: "#fbbf24", marginTop: 4 }}>
          ⭐ {item.rating}
        </Text>

        {/*  button favorite */}
        <Pressable
          onPress={() => toggleFavorite(item.id)}
          style={{ marginTop: 8 }}
        >
          <Text style={{ fontSize: 18 }}>
            {favorites.includes(item.id) ? "❤️" : "🤍"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}