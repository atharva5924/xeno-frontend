import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home";
import Segments from "./pages/Segments";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import CustomersPage from "./pages/CustomersPage"; // New import
import OrdersPage from "./pages/OrdersPage"; // New import
import Navbar from "./pages/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/segments" element={<Segments />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/campaigns/new" element={<CreateCampaign />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
