import React, { createContext, useContext, useState, useEffect } from "react";

/* ================= TYPES ================= */

type Card = {
  id: string;
  number: string;
  name: string;
  expiry: string;
};

type OrderStatus =
  | "reserved"
  | "preparing"
  | "packing"
  | "ready"
  | "completed"
  | "missed";

type Order = {
  id: string;
  item: any;
  date: number;
  step: number;
  status: OrderStatus;
  paymentMethod?: "card" | "cash";
  contested?: boolean;
  contestAccepted?: boolean;
  contestReason?: string;
};

type Donation = {
  id: string;
  item: any;
  date: number;
};

type Factura = {
  name?: string;
  company?: string;
  cui?: string;
  address?: string;
  city?: string;
  phone?: string;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

/*  CONTEXT TYPE  */

type AppContextType = {
    producerItems: any[];
addProducerItem: (item: any) => void;
  ngoRequests: any[];
  addNgoRequest: (req: any) => void;
  updateNgoRequest: (id: string, status: string) => void; 

  factura: Factura | null;
  setFactura: (f: Factura) => void;

  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;

  orders: Order[];
  addOrder: (order: any) => void;
  completeOrder: (id: string) => void;
  missOrder: (id: string) => void;

  applyContestatie: (id: string, reason: string) => void;

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
  const [ngoRequests, setNgoRequests] = useState<any[]>([]);
const [producerItems, setProducerItems] = useState<any[]>([]);
  /* ================= NGO ================= */

  const addNgoRequest = (req: any) => {
    const newRequest = {
      id: Date.now().toString() + Math.random(),
      status: "pending",
      ...req,
    };

    setNgoRequests((prev) => [newRequest, ...prev]);

    // auto accept after 10 seconds
    setTimeout(() => {
  updateNgoRequest(newRequest.id, "accepted");

  addNotification({
    id: Date.now().toString(),
    title: "Cerere acceptată 🎉",
    message: "Un producător a acceptat cererea ta",
    read: false,
  });
}, 10000);
  };

  const updateNgoRequest = (id: string, status: string) => {
    setNgoRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  /* ----- NOTIFICATIONS ----- */

  const addNotification = (n: Notification) => {
    setNotifications((prev) => [n, ...prev]);
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  /*  CARDS  */

  const addCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  /*  ORDERS  */

  const addOrder = (order: any) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      item: order.item,
      date: Date.now(),
      step: 0,
      status: "reserved",
      paymentMethod: order.paymentMethod || "card",
      contested: false,
      contestAccepted: false,
    };

    setOrders((prev) => [newOrder, ...prev]);

    addNotification({
      id: Date.now().toString(),
      title: "Comandă plasată",
      message: order.item.title,
      read: false,
    });
  };

  const completeOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: "completed" } : o
      )
    );
  };

  const missOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: "missed" } : o
      )
    );
  };

  /*  CONTESTATIE  */

  const applyContestatie = (id: string, reason: string) => {
    const order = orders.find((o) => o.id === id);

    if (!order) return;
    if (order.status !== "missed") return;
    if (order.paymentMethod !== "card") return;
    if (order.contested) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, contested: true, contestReason: reason }
          : o
      )
    );

    addNotification({
      id: Date.now().toString(),
      title: "Contestație trimisă",
      message: "Se analizează solicitarea ta...",
      read: false,
    });

    setTimeout(() => {
      const currentOrder = orders.find((o) => o.id === id);
      if (!currentOrder) return;

      const price = parseFloat(
        currentOrder.item.price.replace(",", ".").replace(/[^\d.]/g, "")
      );

      const fullPoints = Math.floor(price);
      const refund = Math.floor(price * 0.25);

      setPoints((prev) => Math.max(prev - fullPoints, 0) + refund);

      addNotification({
        id: Date.now().toString(),
        title: "Contestația acceptată",
        message: `Ai primit ${refund} puncte ⭐ (25%)`,
        read: false,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, contested: true, contestAccepted: true }
            : o
        )
      );
    }, 10000);
  };

  /*  AUTO PROGRESSION */

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => {
          if (
            order.status === "completed" ||
            order.status === "missed" ||
            order.status === "ready"
          ) return order;

          const steps: OrderStatus[] = [
            "reserved",
            "preparing",
            "packing",
            "ready",
          ];

          const nextStep = order.step + 1;
          if (nextStep >= steps.length) return order;

          const nextStatus = steps[nextStep];

          if (nextStatus === "ready") {
            setNotifications((prevNotifs) => [
              {
                id: Date.now().toString(),
                title: "Comandă gata",
                message: `${order.item.title} este gata`,
                read: false,
              },
              ...prevNotifs,
            ]);
          }

          return { ...order, step: nextStep, status: nextStatus };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* ----- DONATIONS ----- */

  const addDonation = (donation: Donation) => {
    setDonations((prev) => [donation, ...prev]);

    addNotification({
      id: Date.now().toString(),
      title: "Donație făcută ❤️",
      message: donation.item.title,
      read: false,
    });
  };

  /* ---- POINTS ---- */

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const usePoints = (amount: number) => {
    setPoints((prev) => Math.max(prev - amount, 0));

    addNotification({
      id: Date.now().toString(),
      title: "Recompensă revendicată ⭐",
      message: `Ai folosit ${amount} puncte`,
      read: false,
    });
  };

  return (
    <AppContext.Provider
      value={{
        producerItems,
addProducerItem: (item: any) => {
  const newItem = {
    id: Date.now().toString(),
    ...item,
  };

  setProducerItems((prev) => [newItem, ...prev]);

  addNotification({
    id: Date.now().toString(),
    title: "Anunț creat 🎉",
    message: item.title,
    read: false,
  });
},
        factura,
        setFactura,
        cards,
        addCard,
        removeCard,
        orders,
        addOrder,
        completeOrder,
        missOrder,
        applyContestatie,
        donations,
        addDonation,
        points,
        addPoints,
        usePoints,
        notifications,
        addNotification,
        markAllRead,
        ngoRequests,
        addNgoRequest,
        updateNgoRequest, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);