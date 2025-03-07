import { useHeaderStore } from "@/store/headerStore";

const Header = () => {
  const theme = useHeaderStore((state) => state.theme);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        theme === "dark"
          ? "text-white bg-black/90 backdrop-blur-sm"
          : "text-black bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-6">
        {/* Your header content */}
      </nav>
    </header>
  );
};

export default Header;
