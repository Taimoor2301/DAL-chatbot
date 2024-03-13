import "@/styles/base.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.variable}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster position="bottom-center" />
    </main>
  );
}

export default MyApp;

// dir = "rtl";
