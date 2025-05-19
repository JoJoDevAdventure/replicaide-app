"use client";

import { useState } from "react";

const CallsHistory = ({ calls, loading, onEdit, onDelete, onAIRecommendations, recommendationsLoading }) => {
  const [filter, setFilter] = useState("All");

  const filteredCalls = calls.filter((call) => {
    if (filter === "All") return true;
    if (filter === "Buying") return call.purpose === "buy";
    if (filter === "Listing") return call.purpose === "sell";
    if (filter === "With Email First") return !!(call.buyData?.email || call.sellData?.email);
    return true;
  });

  if (!filteredCalls.length) {
    return <div className="text-center py-6">No calls found.</div>;
  }

  const renderValue = (value) => {
    if (value === undefined || value === null || value === "") return "Not Provided";
    return value;
  };

  return (
    <div className="overflow-x-auto text-gray-500">
      {/* Filter Dropdown */}
      <div className="flex items-center gap-4 mb-4 justify-left">
        <label className="text-gray-700 font-medium">Filters:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-p1"
        >
          <option value="All">All</option>
          <option value="Buying">Buying</option>
          <option value="Listing">Listing</option>
          <option value="With Email First">With Email First</option>
        </select>
      </div>

      {/* Table for larger screens */}
      <table className="hidden md:table w-full text-left border-collapse bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Purpose</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Date</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Phone</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Property Type</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalls.map((call, index) => {
            const data = call.purpose === "buy" ? call.buyData || {} : call.sellData || {};
            return (
              <tr
                key={call.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3 text-sm text-gray-700 capitalize">{renderValue(call.purpose)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {renderValue(
                    call.timestamp
                      ? new Date(call.timestamp).toLocaleString("en-US", {
                          timeZone: "America/Los_Angeles",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : null
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {renderValue(
                    [data.firstName, data.lastName].filter(Boolean).join(" ") || null
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{renderValue(data.email)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{renderValue(data.phone)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{renderValue(data.propertyType || data.preferredPropertyType)}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button
                    onClick={() => onEdit(call)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(call.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onAIRecommendations(call)}
                    disabled={recommendationsLoading}
                    className={`text-p1 hover:text-p1/80 flex items-center gap-1 ${recommendationsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="AI Recommendations"
                  >
                    {recommendationsLoading ? (
                      <svg className="animate-spin w-4 h-4 text-p1" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L7.982 19.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                    Recommendations
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Cards for smaller screens */}
      <div className="md:hidden grid gap-4">
        {filteredCalls.map((call) => {
          const data = call.purpose === "buy" ? call.buyData || {} : call.sellData || {};
          return (
            <div
              key={call.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition border"
            >
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Purpose:</span>{" "}
                {renderValue(call.purpose)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Date:</span>{" "}
                {renderValue(
                  call.timestamp
                    ? new Date(call.timestamp).toLocaleString("en-US", {
                        timeZone: "America/Los_Angeles",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : null
                )}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Name:</span>{" "}
                {renderValue(
                  [data.firstName, data.lastName].filter(Boolean).join(" ") || null
                )}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Email:</span> {renderValue(data.email)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Phone:</span> {renderValue(data.phone)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Property Type:</span>{" "}
                {renderValue(data.propertyType || data.preferredPropertyType)}
              </p>
              <div className="flex justify-end gap-4 mt-2">
                <button
                  onClick={() => onEdit(call)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(call.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => onAIRecommendations(call)}
                  disabled={recommendationsLoading}
                  className={`text-p1 hover:text-p1/80 flex items-center gap-1 ${recommendationsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="AI Recommendations"
                >
                  {recommendationsLoading ? (
                    <svg className="animate-spin w-4 h-4 text-p1" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L7.982 19.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                  Recommendations
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CallsHistory;
