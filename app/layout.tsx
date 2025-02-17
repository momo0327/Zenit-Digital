import "./globals.css"; // Import the CSS file for global styles
import Navbar from "../components/Navbar";
import Script from "next/script"; // Import Script component from Next.js

export const metadata = {
  title: "Zenit Digital",
  description: "Landing page for Zenit Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Cookiebot Script */}
        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="74ed7c8b-7181-40f8-9019-c8770f9209f8" data-blockingmode="auto" type="text/javascript"></script>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
