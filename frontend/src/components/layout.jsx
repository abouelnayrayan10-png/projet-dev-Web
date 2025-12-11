import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <Sidebar />

      <div style={{ marginLeft: "260px", marginTop: "80px", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
