export const getReserveDay = ({
  now, // minutes (e.g. 14:20 = 860)
  dayIndex,
  pickupStart,
  pickupEnd,
}: {
  now: number;
  dayIndex: number;
  pickupStart: number;
  pickupEnd: number;
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

  const start = pickupStart * 60;
  const end = pickupEnd * 60;

  // 🔥 KEY LOGIC
  // If current time is AFTER pickup window → tomorrow
  if (now >= end) {
    return {
      label: days[(dayIndex + 1) % 7],
    };
  }

  // If BEFORE pickup → today
  if (now < start) {
    return {
      label: days[dayIndex],
    };
  }

  // If DURING pickup → still today
  return {
    label: days[dayIndex],
  };
};