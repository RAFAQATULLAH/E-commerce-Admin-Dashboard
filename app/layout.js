import { Geist, Geist_Mono } from "next/font/google";
import DashboardLayout from "@/Components/DashboardLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Next.js Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#111936]">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}