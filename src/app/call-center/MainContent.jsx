"use client";

import RecommendationsPopup from "@/Components/RecommendationsPopup";
import CallDetails from "@/Components/dashboard/CallDetails";
import Tabs from "@/Components/dashboard/Tabs"; // Tabs component for navigation between sections
import { useEffect, useRef, useState } from "react"; // React state management
import { useTheme } from "../context/themeContext"; // Theme context for dark/light mode
import CallsHistory from "./CallsHistory";
import LiveCalls from "./calls";
import { fetchHistoryCalls, initiateDatabase } from "./service";

const MainContent = () => {
  const { isDarkMode } = useTheme(); // Get the current theme (dark or light mode)
  const [activeTab, setActiveTab] = useState(0); // Tab state: 0 = Calls History, 1 = LIVE Call
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callDetails, setCallDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  const hasFetched = useRef(false);

  // Fetch call data from Firebase
  const fetchCalls = async () => {
    try {
      setLoading(true);
      await initiateDatabase(); // Fetch data from Firebase
      const data = await fetchHistoryCalls();
      setCalls(
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      ); // Update state with sorted calls
      console.log(calls);
    } catch (error) {
      console.error("Error fetching calls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCalls(); // Fetch calls on component mount
  }, []);

  // Handle delete call
  const handleDelete = async (id) => {
    try {
      await deleteById(id); // Delete call by ID
      setCallDetails(null); // Close details if open
      await fetchCalls(); // Refresh calls after delete
      alert("Call deleted successfully!");
    } catch (error) {
      console.error("Error deleting call:", error);
      alert("Failed to delete the call.");
    }
  };

  // Handle update call
  const onUpdate = async (id, updatedData) => {
    try {
      await updateById(id, updatedData); // Update call by ID
      alert("Call updated successfully!");
      await fetchCalls(); // Refresh calls after update
      setCallDetails(null); // Close details after update
    } catch (error) {
      console.error("Error updating call:", error);
      alert("Failed to update the call.");
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-s3"></div>
        </div>
      )}
      <div
        className={`p-6 space-y-4 h-full ${
          isDarkMode ? "bg-s1 bg-opacity-[98%]" : "bg-white" // Dynamic background based on theme
        }`}
      >
        {/* Tabs Section */}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["Calls History", "Live Calls"]}
        />

        {/* Conditional rendering based on the active tab */}
        {activeTab === 0 && (
          <CallsHistory
            calls={calls} // Pass the fetched calls to the CallsHistory component
            loading={loading} // Pass the loading state to the CallsHistory component
            onEdit={setCallDetails} // Pass selected call to details
            onDelete={handleDelete} // Handle delete logic
            recommendationsLoading={recommendationsLoading}
            onAIRecommendations={(call) => {
              setRecommendationsLoading(true);
              const bedrooms = call?.buyData?.bedrooms || "1";
              const bathrooms = call?.buyData?.bathrooms || "1";
              const notes = (call?.buyData?.notes || "").replace(/\s+/g, ",");

              getRecommendations(bedrooms, bathrooms, notes)
                .then((recs) => {
                  console.log("Fetched Recommendations:", recs);
                  setRecommendations(recs);
                  setShowRecommendations(true);
                  setRecommendationsLoading(false);
                })
                .catch(() => {
                  setRecommendationsLoading(false);
                });
            }}
          />
        )}

        {/* Call Details */}
        {callDetails && (
          <CallDetails
            callDetails={callDetails}
            setCallDetails={setCallDetails}
            onDeleteCall={() => handleDelete(callDetails.id)}
            onSaveCall={(finalData) => onUpdate(callDetails.id, finalData)}
          />
        )}
        <RecommendationsPopup
          recommendations={recommendations}
          showPopup={showRecommendations}
          onHidePopup={() => setShowRecommendations(false)}
        />

        {activeTab === 1 && (
          <LiveCalls
          />
        )}
      </div>
    </>
  );
};

export default MainContent;
