import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  location: string;
  maxDistance: number;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    location: "",
    maxDistance: 5,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside provider");
  return context;
};