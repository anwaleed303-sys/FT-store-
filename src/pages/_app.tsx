import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0066FF",
          colorSuccess: "#00D4B1",
          colorWarning: "#FFA500",
          colorError: "#FF6B6B",
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
