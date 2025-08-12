import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* Change status bar background & text color */}
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f5f5f5" },
        }}
      />
    </>
  );
}
