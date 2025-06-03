import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CampaignList from "../components/CampaignList";
import { useAuth } from "../context/AuthContext";

const Campaigns = () => {
  const { user } = useAuth();

  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/campaigns");
      return response.data;
    },
  });

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <CampaignList campaigns={campaigns} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Campaigns;
