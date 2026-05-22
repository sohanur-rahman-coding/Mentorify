import { Plus_Jakarta_Sans, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { NextThemeProvider } from "@/providers/NextThemeProvider";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQueue - Elite Mentor Platform",
  description: "Find and book expert verified mentors globally.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased bg-background text-foreground`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextThemeProvider>
          <SmoothScroll />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </NextThemeProvider>
      </body>
    </html>
  );
}
