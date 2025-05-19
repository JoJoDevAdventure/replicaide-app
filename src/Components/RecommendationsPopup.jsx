const RecommendationsPopup = ({ recommendations, showPopup, onHidePopup }) => {
  if (!recommendations || !showPopup) return null;

  const importantFields = [
    { label: "Address", key: "PropertyAddressFull" },
    { label: "City", key: "PropertyAddressCity" },
    { label: "State", key: "PropertyAddressState" },
    { label: "Price", key: "LatestListingPrice" },
    { label: "Bedrooms", key: "BedroomsTotal" },
    { label: "Bathrooms", key: "BathroomsFull" },
    { label: "Living Area (sqft)", key: "LivingAreaSquareFeet" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 text-gray-600"
      onClick={onHidePopup}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-h-[90vh] w-full max-w-4xl relative overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onHidePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          &times;
        </button>

        {/* Card layout for small screens */}
        <div className="block md:hidden">
          <div className="grid gap-4 sm:grid-cols-1">
            {recommendations.map((item, index) => (
              <div key={index} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                {importantFields.map((field) => (
                  <div key={field.key} className="mb-2">
                    <div className="text-xs text-gray-500">{field.label}</div>
                    <div className="text-sm font-medium">
                      {item[field.key] ?? "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Table layout for md and above */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                {importantFields.map((field) => (
                  <th key={field.key} className="px-4 py-2 text-left border-b">
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recommendations.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {importantFields.map((field) => (
                    <td key={field.key} className="px-4 py-2">
                      {item[field.key] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPopup;