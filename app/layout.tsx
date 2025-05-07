import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CursorProvider } from "../utils/CursorContext";
import ClientCursorWrapper from "../Components/ClientCursorWrapper";

export const metadata: Metadata = {
  title: "Zenit Digital",
  description: "Landing page for Zenit Digital",
  icons: {
    icon: "/favicon.svg", // This should be in `public/`
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="cookiebot"
          strategy="afterInteractive"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="74ed7c8b-7181-40f8-9019-c8770f9209f8"
          data-blockingmode="auto"
        />
      </head>
      <body>
        <CursorProvider>
          <Navbar />
          {children}
          <ClientCursorWrapper />
        </CursorProvider>
      </body>
    </html>
  );
}
