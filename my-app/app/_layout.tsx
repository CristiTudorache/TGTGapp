import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { AppProvider } from "../context/AppContext";

export default function Layout() {
  return (
    <UserProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppProvider>
    </UserProvider>
  );
}