import { useEffect, useState } from "react";

const LiveBuyingInfo = ({
  parsedListing,
  onEndCall,
  onSave,
  isDarkMode,
  isLive,
  onDeleteCall,
}) => {
  const [buyerData, setBuyerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: "",
    financingType: "",
    preferredPropertyType: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    moveInTimeline: "",
    additionalNotes: "",
  });

  useEffect(() => {
    if (parsedListing) {
      setBuyerData(parsedListing);
    }
  }, [parsedListing]);

  const handleFieldEdit = (key, value) => {
    setBuyerData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={`p-6 border-2 rounded-xl ${isDarkMode ? "bg-s1 border-p1" : "bg-white border-p1/10"}`}>
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-500">Buyer Info</p>
        <div className="mt-3 grid grid-cols-2 gap-4 mb-6">
          {Object.keys(buyerData).map((key) => (
            <div key={key}>
              <p className="text-xs text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <input
                type="text"
                value={buyerData[key]}
                onChange={(e) => handleFieldEdit(key, e.target.value)}
                className="w-full text-black text-sm rounded px-3 py-2 border border-gray-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        {isLive ? (
          <button onClick={onEndCall} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            End Call
          </button>
        ) : (
          <button onClick={onDeleteCall} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Call
          </button>
        )}

        <button onClick={() => onSave(buyerData)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Save Info
        </button>
      </div>
    </div>
  );
};

export default LiveBuyingInfo;
