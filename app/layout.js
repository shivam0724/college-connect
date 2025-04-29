import { STIX_Two_Text } from "next/font/google";
import "../styles/globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-stix-two-text",
});

export default function RootLayout({ children }) {
  const session = auth();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${stixTwoText.variable} antialiased`}>
        <ToastContainer />
        <SessionWrapper session={session}>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}

export const metadata = {
  title: "College Connect: Learn Engage Grow",
  description: "A platform for students to connect and learn",
};