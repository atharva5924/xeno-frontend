import { Link } from "react-router-dom";

const CampaignList = ({ campaigns, isLoading, error }) => {
  if (isLoading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error loading campaigns</div>;
  if (!Array.isArray(campaigns)) {
    console.error("Campaigns is not an array:", campaigns);
    return <div>No campaigns data available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Campaigns</h2>
        <Link
          to="/campaigns/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Campaign
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Segment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Failed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No campaigns found
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/campaigns/${campaign._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.segmentId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.sentCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.failedCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.totalCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {/* <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {campaign.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.segmentId?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === "sent"
                        ? "bg-green-100 text-green-800"
                        : campaign.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.sentCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.failedCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.totalCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(campaign.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default CampaignList;
