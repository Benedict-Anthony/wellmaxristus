import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Well Max Ristus Academy",
  description: "Make learning easy | Home",
  keywords: "school, online school, kids school, WellMax-Ristus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer limit={1} position="top-center" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
