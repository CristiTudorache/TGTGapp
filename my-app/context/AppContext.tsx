import React, { createContext, useContext, useState } from "react";

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

type AppContextType = {
  factura: any;
  setFactura: (f: any) => void;

  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;

  orders: Order[];
  addOrder: (order: Order) => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: any) => {
  const [factura, setFactura] = useState<any>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addCard = (card: Card) => setCards((prev) => [...prev, card]);
  const removeCard = (id: string) =>
    setCards((prev) => prev.filter((c) => c.id !== id));

  const addOrder = (order: Order) =>
    setOrders((prev) => [order, ...prev]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);