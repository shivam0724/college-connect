import { STIX_Two_Text } from "next/font/google";
import "../styles/globals.css";
import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-stix-two-text",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${stixTwoText.variable} antialiased`}>
        <ToastContainer />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "College Connect: Learn Engage Grow",
  description: "A platform for students to connect and learn",
};