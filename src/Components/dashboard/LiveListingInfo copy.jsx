import { useEffect, useState } from "react";

const LiveListingInfo = ({
  parsedListing,
  onEndCall,
  onSave,
  isDarkMode,
  isLive,
  onDeleteCall,
}) => {
  const [listingData, setListingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "702-555-1212", // Static phone number
    isListed: null,
    propertyType: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    surface: "",
    rooms: "",
    bathrooms: "",
    notes: "",
  });

  // Update the form fields whenever parsedListing changes
  useEffect(() => {
    if (parsedListing) {
      setListingData(parsedListing);
    }
  }, [parsedListing]);

  // Handle field updates locally
  const handleFieldEdit = (key, value) => {
    const keys = key.split(".");
    setListingData((prev) => {
      const newData = { ...prev };
      let obj = newData;
      keys.slice(0, -1).forEach((k) => {
        if (!obj[k]) obj[k] = {};
        obj = obj[k];
      });
      obj[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Dynamic text and border colors
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const inputBorderColor = (isHighlighted) =>
    isHighlighted
      ? "border-p1"
      : isDarkMode
      ? "border-gray-600"
      : "border-gray-300";

  return (
    <div
      className={`p-6 border-2 rounded-xl ${
        isDarkMode ? "bg-s1 border-p1" : "bg-white border-p1/10"
      }`}
    >
      {/* Client Info Section */}
      <div className="mb-8">
        <p className={`text-sm font-semibold ${labelColor}`}>Client Info</p>
        <div className="mt-3 grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className={`text-xs ${labelColor}`}>First Name</p>
            <input
              type="text"
              value={listingData.firstName}
              onChange={(e) => handleFieldEdit("firstName", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.firstName)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Last Name</p>
            <input
              type="text"
              value={listingData.lastName}
              onChange={(e) => handleFieldEdit("lastName", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.lastName)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Email</p>
            <input
              type="text"
              value={listingData.email}
              onChange={(e) => handleFieldEdit("email", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.email)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Phone Number</p>
            <input
              type="text"
              value={listingData.phone}
              readOnly // Static phone number
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.phone)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
        </div>
      </div>

      {/* Listing Info Section */}
      <div className="mb-8 grid">
        <p className={`text-sm font-semibold ${labelColor}`}>Listing Info</p>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div>
            <p className={`text-xs ${labelColor}`}>Is Currently Listed</p>
            <input
              type="text"
              value={listingData.isListed == null ? "" : listingData.isListed}
              onChange={(e) => handleFieldEdit("isListed", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} border ${
                (isDarkMode ? "bg-gray-700" : "bg-white",
                listingData.isListed == null || listingData.isListed == ""
                  ? "border-gray-300"
                  : "border-p1")
              }`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Property Type</p>
            <input
              type="text"
              value={listingData.propertyType}
              onChange={(e) => handleFieldEdit("propertyType", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.propertyType)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Street Address</p>
            <input
              type="text"
              value={listingData.address.street}
              onChange={(e) =>
                handleFieldEdit("address.street", e.target.value)
              }
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.address.street)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>City</p>
            <input
              type="text"
              value={listingData.address.city}
              onChange={(e) => handleFieldEdit("address.city", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.address.city)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>State</p>
            <input
              type="text"
              value={listingData.address.state}
              onChange={(e) => handleFieldEdit("address.state", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.address.state)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>ZIP</p>
            <input
              type="text"
              value={listingData.address.zip}
              onChange={(e) => handleFieldEdit("address.zip", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.address.zip)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Surface</p>
            <input
              type="text"
              value={listingData.surface}
              onChange={(e) => handleFieldEdit("surface", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.surface)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Nº of Rooms</p>
            <input
              type="text"
              value={listingData.rooms}
              onChange={(e) => handleFieldEdit("rooms", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.rooms)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
          <div>
            <p className={`text-xs ${labelColor}`}>Nº of Bathrooms</p>
            <input
              type="text"
              value={listingData.bathrooms}
              onChange={(e) => handleFieldEdit("bathrooms", e.target.value)}
              className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
                Boolean(listingData.bathrooms)
              )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mb-6">
        <p className={`text-sm font-semibold mb-2 ${labelColor}`}>Notes</p>
        <textarea
          value={listingData.notes}
          onChange={(e) => handleFieldEdit("notes", e.target.value)}
          className={`w-full text-sm rounded px-3 py-2 ${textColor} ${inputBorderColor(
            Boolean(listingData.notes)
          )} border ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
          placeholder="Add notes here..."
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        {isLive ? (
          <button
            onClick={onEndCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            End Call
          </button>
        ) : (
          <button
            onClick={onDeleteCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Call
          </button>
        )}

        <button
          onClick={() => onSave(listingData)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Save Info
        </button>
      </div>
    </div>
  );
};

export default LiveListingInfo;
