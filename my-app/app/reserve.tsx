import { View, Text } from "react-native";

/* ---------- YOUR LOGIC (UNCHANGED) ---------- */
export const getReserveDay = ({
  now,
  dayIndex,
  pickupStart,
  pickupEnd,
}: {
  now: number;
  dayIndex: number;
  pickupStart?: number;
  pickupEnd?: number;
}) => {
  const days = [
    "Duminică",
    "Luni",
    "Marți",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sâmbătă",
  ];

  let targetDay = dayIndex;

  if (
    pickupStart !== undefined &&
    pickupEnd !== undefined
  ) {
    const end = pickupEnd * 60;

    // ✅ ONLY after window ends → next day
    if (now >= end) {
      targetDay = (dayIndex + 1) % 7;
    }
  }

  const isToday = targetDay === dayIndex;
  const isTomorrow = targetDay === (dayIndex + 1) % 7;

  return {
    label: days[targetDay],
    isToday,
    isTomorrow,
  };
};

/* ---------- REQUIRED SCREEN EXPORT (FIXES WARNING) ---------- */
export default function ReserveScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>Reserve Screen</Text>
    </View>
  );
}