import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageGenerator from "../components/MessageGenerator";
import { useAuth } from "../context/AuthContext";

const CreateCampaign = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [segmentId, setSegmentId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { data: segmentsData, isLoading: segmentsLoading } = useQuery({
    queryKey: ["segments"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/segments");
        return response.data.segments || []; // Access the segments array
      } catch (error) {
        console.error("Error fetching segments:", error);
        return [];
      }
    },
  });

  // segments will always be an array
  const segments = Array.isArray(segmentsData) ? segmentsData : [];

  const { mutate: createCampaign, isPending } = useMutation({
    mutationFn: (campaignData) =>
      axios.post("http://localhost:3000/api/campaigns", campaignData),
    onSuccess: () => {
      navigate("/campaigns");
    },
    onError: (error) => {
      console.error("Error creating campaign:", error);
      alert(error.response?.data?.message || "Failed to create campaign");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !segmentId || !message.trim()) {
      alert("Please fill all required fields");
      return;
    }
    createCampaign({ name, segmentId, message });
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Campaign Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Segment</label>
          <select
            value={segmentId}
            onChange={(e) => setSegmentId(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={segmentsLoading}
          >
            <option value="">Select a segment</option>
            {segments.map((segment) => (
              <option key={segment._id} value={segment._id}>
                {segment.name} ({segment.customerCount || 0} customers)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message</label>
          <MessageGenerator onSelect={setMessage} />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            rows={4}
            required
            placeholder="Enter your campaign message or generate one below"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isPending ? "Creating..." : "Create Campaign"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/campaigns")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
