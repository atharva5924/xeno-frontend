import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Mini CRM
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/segments" className="px-3 py-2 hover:text-blue-600">
                Segments
              </Link>
              <Link to="/campaigns" className="px-3 py-2 hover:text-blue-600">
                Campaigns
              </Link>

              <Link to="/customers" className="px-3 py-2 hover:text-blue-600">
                Customers
              </Link>
              <Link to="/orders" className="px-3 py-2 hover:text-blue-600">
                Orders
              </Link>
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
