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

// ❤️ DONATION (NEW)
type Donation = {
  id: string;
  item: any;
  date: number;
};

// 🧾 FACTURA (FULL VERSION)
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
  // FACTURA
  factura: Factura | null;
  setFactura: (f: Factura) => void;

  // CARDS
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;

  // ORDERS
  orders: Order[];
  addOrder: (order: Order) => void;

  // ❤️ DONATIONS (NEW)
  donations: Donation[];
  addDonation: (donation: Donation) => void;
};

/* ================= CONTEXT ================= */

const AppContext = createContext<AppContextType>({} as AppContextType);

/* ================= PROVIDER ================= */

export const AppProvider = ({ children }: any) => {
  const [factura, setFactura] = useState<Factura | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // ❤️ NEW STATE
  const [donations, setDonations] = useState<Donation[]>([]);

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

        // ❤️ NEW
        donations,
        addDonation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useApp = () => useContext(AppContext);