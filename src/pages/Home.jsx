import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Welcome to Mini CRM</h1>
      {user ? (
        <p className="text-lg">
          Hello, {user.name}! Ready to manage your campaigns?
        </p>
      ) : (
        <p className="text-lg">Please login to access the CRM platform</p>
      )}
    </div>
  );
};

export default Home;
