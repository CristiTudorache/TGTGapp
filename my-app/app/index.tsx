import { WebView } from "react-native-webview";

export default function Index() {
  return (
    <WebView
      source={{ uri: "https://foodlinkapp.lovable.app" }}
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={["*"]}
      cacheEnabled
    />
  );
}