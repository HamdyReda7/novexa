import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons/FloatingContactButtons";

function App() {
  return (
    <div className="app-layout">
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