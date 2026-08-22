import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons/FloatingContactButtons";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}

export default App;