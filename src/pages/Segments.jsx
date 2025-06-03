import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import SegmentBuilder from "../components/SegmentBuilder";
import { useAuth } from "../context/AuthContext";

const Segments = () => {
  const { user } = useAuth();
  const [showBuilder, setShowBuilder] = useState(false);

  const {
    data: responseData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["segments"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/segments");
      return response.data.segments || []; // Access the segments array
    },
  });

  // segments will always be an array
  const segments = Array.isArray(responseData) ? responseData : [];

  const { mutate: saveSegment } = useMutation({
    mutationFn: (segmentData) =>
      axios.post("http://localhost:3000/api/segments", segmentData),
    onSuccess: () => {
      setShowBuilder(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error saving segment:", error);
    },
  });

  const handleSaveSegment = (segmentData) => {
    saveSegment(segmentData);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Segments</h1>
        <button
          onClick={() => setShowBuilder(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Segment
        </button>
      </div>

      {showBuilder ? (
        <SegmentBuilder
          onSave={handleSaveSegment}
          onCancel={() => setShowBuilder(false)}
        />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    Loading segments...
                  </td>
                </tr>
              ) : segments?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No segments found
                  </td>
                </tr>
              ) : (
                segments?.map((segment) => (
                  <tr key={segment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {segment.name}
                    </td>
                    <td className="px-6 py-4">{segment.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {segment.customerCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(segment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Segments;
