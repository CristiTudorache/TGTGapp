import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useApp } from "../context/AppContext";

export default function Create() {
  const router = useRouter();
  const { addProducerItem } = useApp();

  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [pickup, setPickup] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const publish = () => {
    if (!title || !desc || !price || !qty || !pickup) {
      Alert.alert("Completează toate câmpurile");
      return;
    }

    addProducerItem({
      title,
      desc,
      price,
      qty,
      pickup,
      image,
    });

    router.replace("/main"); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 16 }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 10 }}>
        Creează anunț
      </Text>

      <Pressable
        onPress={pickImage}
        style={{
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#22c55e",
          padding: 40,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 120, height: 120 }} />
        ) : (
          <Text style={{ color: "#94a3b8" }}>Adaugă fotografie</Text>
        )}
      </Pressable>

      <Input label="Titlu" value={title} set={setTitle} />
      <Input label="Descriere" value={desc} set={setDesc} />
      <Input label="Preț" value={price} set={setPrice} />
      <Input label="Cantitate" value={qty} set={setQty} />
      <Input label="Timp ridicare" value={pickup} set={setPickup} />

      <Pressable
        onPress={publish}
        style={{
          backgroundColor: "#22c55e",
          padding: 14,
          borderRadius: 12,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Publică anunțul</Text>
      </Pressable>
    </View>
  );
}

const Input = ({ label, value, set }: any) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={{ color: "#94a3b8" }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={set}
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: 12,
        borderRadius: 10,
        marginTop: 4,
      }}
    />
  </View>
);