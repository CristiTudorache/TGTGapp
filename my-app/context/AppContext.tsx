import React, { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */

// 💳 CARD
type Card = {
  id: string;
  number: string;
  name: string;
  expiry: string;
};

// 📦 ORDER
type Order = {
  id: string;
  item: any;
  date: number;
};

// ❤️ DONATION
type Donation = {
  id: string;
  item: any;
  date: number;
};

// 🧾 FACTURA
type Factura = {
  name: string;
  company?: string;
  cui?: string;
  address: string;
  city: string;
  phone: string;
};

/* ================= CONTEXT TYPE ================= */

type AppContextType = {
  factura: Factura | null;
  setFactura: (f: Factura) => void;

  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;

  orders: Order[];
  addOrder: (order: Order) => void;

  donations: Donation[];
  addDonation: (donation: Donation) => void;

  // ⭐ POINTS
  points: number;
  addPoints: (amount: number) => void;
  usePoints: (amount: number) => void;
};

/* ================= CONTEXT ================= */

const AppContext = createContext<AppContextType>({} as AppContextType);

/* ================= PROVIDER ================= */

export const AppProvider = ({ children }: any) => {
  const [factura, setFactura] = useState<Factura | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  // ✅ FIX: start from 0 (real system)
  const [points, setPoints] = useState(0);

  /* ---------- CARD FUNCTIONS ---------- */

  const addCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  /* ---------- ORDER FUNCTIONS ---------- */

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  /* ---------- DONATION FUNCTIONS ---------- */

  const addDonation = (donation: Donation) => {
    setDonations((prev) => [donation, ...prev]);
  };

  /* ---------- POINT FUNCTIONS ---------- */

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const usePoints = (amount: number) => {
    setPoints((prev) => Math.max(prev - amount, 0));
  };

  return (
    <AppContext.Provider
      value={{
        factura,
        setFactura,

        cards,
        addCard,
        removeCard,

        orders,
        addOrder,

        donations,
        addDonation,

        points,
        addPoints,
        usePoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useApp = () => useContext(AppContext);