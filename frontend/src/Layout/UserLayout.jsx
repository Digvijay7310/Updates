import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
