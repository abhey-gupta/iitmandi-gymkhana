import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";

const quicksand = Quicksand({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "IIT Mandi Gymkhana",
  description: "IIT Mandi Gymkhana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <NextTopLoader color="#FF0000" height={4} />
        <div>
          <Navbar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
