import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Zenit Digital",
  description: "Landing page for Zenit Digital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
