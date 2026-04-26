import React, { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */

type Card = {
  id: string;
  number: string;
  name: string;
  expiry: string;
};

type Order = {
  id: string;
  item: any;
  date: number;
};

type Donation = {
  id: string;
  item: any;
  date: number;
};

type Factura = {
  name: string;
  company?: string;
  cui?: string;
  address: string;
  city: string;
  phone: string;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
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

  points: number;
  addPoints: (amount: number) => void;
  usePoints: (amount: number) => void;

  notifications: Notification[];
  addNotification: (n: Notification) => void;
  markAllRead: () => void;
};

/* ================= CONTEXT ================= */

const AppContext = createContext<AppContextType>({} as AppContextType);

/* ================= PROVIDER ================= */

export const AppProvider = ({ children }: any) => {
  const [factura, setFactura] = useState<Factura | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [points, setPoints] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /* ---------- NOTIFICATIONS ---------- */

  const addNotification = (n: Notification) => {
    setNotifications((prev) => [n, ...prev]);
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  /* ---------- CARDS ---------- */

  const addCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  /* ---------- ORDERS ---------- */

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);

    // 🔔 AUTO notification
    addNotification({
      id: Date.now().toString(),
      title: "Comandă plasată",
      message: order.item.title,
      read: false,
    });
  };

  /* ---------- DONATIONS ---------- */

  const addDonation = (donation: Donation) => {
    setDonations((prev) => [donation, ...prev]);

    // 🔔 AUTO notification
    addNotification({
      id: Date.now().toString(),
      title: "Donație făcută ❤️",
      message: donation.item.title,
      read: false,
    });
  };

  /* ---------- POINTS ---------- */

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const usePoints = (amount: number) => {
    setPoints((prev) => Math.max(prev - amount, 0));

    // 🔔 AUTO notification
    addNotification({
      id: Date.now().toString(),
      title: "Recompensă revendicată ⭐",
      message: `Ai folosit ${amount} puncte`,
      read: false,
    });
  };

  /* ---------- PROVIDER ---------- */

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

        notifications,
        addNotification,
        markAllRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useApp = () => useContext(AppContext);