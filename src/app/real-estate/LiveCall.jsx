"use client";

import successAnimation from '@/Components/animations/successAnimation';
import AgentInfo from "@/Components/dashboard/AgentInfo";
import CallInfo from "@/Components/dashboard/CallInfo";
import LiveBuyingInfo from '@/Components/dashboard/LiveBuyingInfo';
import LiveTranscript from "@/Components/dashboard/LiveTranscript";
import Loading from "@/Components/Loading";
import RecommendationsPopup from '@/Components/RecommendationsPopup';
import { buyPrompt } from "@/data";
import { Conversation } from "@11labs/client";
import Lottie from 'lottie-react';
import { useRef, useState } from "react";
import { extractBuyerData, getRecommendations, saveBuyerToFirebase } from "./service";

const IsSaved = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-80 h-80 bg-white flex justify-center flex-col items-center">
        <Lottie
          animationData={successAnimation}
          loop={false}
          onComplete={onComplete}
          className='h-52 w-52'
        />
        <h2 className='h4 text-p1'>Buyer Info Saved</h2>
      </div>
    </div>
  );
};

const LiveCall = ({ call, isActive, isDarkMode }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState("00:00");
  const [conversation, setConversation] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const [isOffCall, setIsOffCall] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const audioRef = useRef(null);
  const [showSaved, setShowSaved] = useState(false);
  const [hasFetchedRecommendations, setHasFetchedRecommendations] = useState(false);

  const savedBuyer = () => {
    setShowSaved(true);
  };

  const onSave = async (messages, buyerData) => {
    setIsLoading(true);
    try {
      const docId = await saveBuyerToFirebase(buyerData, messages);
      setIsLoading(false);
      savedBuyer();
      console.log("Saved to Firebase with ID:", docId);
    } catch (error) {
      console.error("Failed to save to Firebase:", error);
    }
  };

  const activateAgent = async () => {
    try {
      const agentId = "Vedmd1vikHwnnogAwVbw";

      const conv = await Conversation.startSession({
        agentId,
        overrides: {
          agent: {
            prompt: {
              prompt: buyPrompt,
            },
            firstMessage:
              "Hello, this is Sky Group, my name is John. How can I help you today?",
          },
          tts: {
            voiceId: "",
          },
        },
        
        onMessage: async (props) => {
          console.log("Message Received:", props);

          setMessages((prevMessages) => {
            const updatedMessages = [
              ...prevMessages,
              { source: props.source, message: props.message },
            ];

            if (
              updatedMessages.length >= 4 &&
              updatedMessages.length % 2 === 0
            ) {
              extractBuyerData(updatedMessages).then((data) => {
                if (data) {
                  console.log("Extracted Buyer Data:", data);
                  setBuyerData(data);
                  if (data.city !== "" && !hasFetchedRecommendations && recommendations.length == 0) {
                    setHasFetchedRecommendations(true);
                    getRecommendations().then((recs) => {
                      console.log("Fetched Recommendations:", recs);
                      setRecommendations(recs);
                    });
                  }
                }
              });
            }
            return updatedMessages;
          });
        },

        onError: (error) => {
          console.error("Agent Error:", error);
        },

        onDisconnect: () => {
          console.log("Agent Disconnected Successfully");
        },

        onModeChange: (prop) => {
          console.log("Agent Changed Mode : ", prop);
          setIsSpeaking(prop.mode === "listening");
        },

        onStatusChange: (prop) => {
          console.log("Agent Status Changed : ", prop);
          if (prop.status === "disconnected") {
            alert("The agent has disconnected.");
            setIsOnCall(false);
            setIsCalling(false);
            setIsOffCall(true);
          }
        },
      });

      setConversation(conv);
    } catch (error) {
      console.error("Error activating agent:", error);
    }
  };

  const deactivateAgent = async () => {
    if (conversation) {
      await conversation.endSession();
      setConversation(null);
    }
  };

  const handleCall = () => {
    setIsCalling(true);
    setIsOffCall(false);

    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio playback failed:", err));
    }

    setTimeout(() => {
      setIsCalling(false);
      setIsOnCall(true);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      activateAgent();
    }, 7000);
  };

  const handleHang = () => {
    setIsCalling(false);
    setIsOnCall(false);
    setIsOffCall(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    deactivateAgent();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-auto overflow-y-scroll bg-white p-6">
        <RecommendationsPopup
          recommendations={recommendations}
          showPopup={showRecommendations}
          onHidePopup={() => setShowRecommendations(false)}
        />

      {showSaved && <IsSaved onComplete={() => setShowSaved(false)} />}
      {isLoading && <Loading />}
      {/* Left Column: Agent Info, Call Info, and Live Transcript */}
      <div className="md:w-1/2 flex flex-col gap-4 h-full">
        <div className="flex gap-4">
          <div className="w-1/2">
            <AgentInfo
              name={
                call.isLive
                  ? `John`
                  : `${call.clientInfo.firstName} ${call.clientInfo.lastName}`
              }
              isCalling={isCalling}
              isOnCall={isOnCall}
              isOffCall={isOffCall}
              onCall={handleCall}
              onHang={handleHang}
              isDarkMode={isDarkMode}
            />
          </div>
          <div className="w-1/2">
            <CallInfo timestamp={currentTimestamp} isDarkMode={isDarkMode} />
          </div>
        </div>

        <LiveTranscript
          messages={messages}
          isSpeaking={isSpeaking}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className="md:w-1/2 h-full">
        <div className="mb-4">
          <button
            onClick={() => setShowRecommendations(true)}
            disabled={recommendations.length === 0}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md transition ${
              recommendations.length === 0
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-p1 text-white hover:bg-opacity-90'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.92-.755 1.688-1.54 1.118l-3.362-2.44a1 1 0 00-1.176 0l-3.362 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.034 9.376c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.948z" />
            </svg>
            Show Recommendations
          </button>
        </div>
        
        <LiveBuyingInfo parsedListing={buyerData} onSave={(finalData) => onSave(messages, finalData)} isDarkMode={isDarkMode} />
      </div>
      <audio ref={audioRef} src="./ring.wav" loop />
    </div>
  );
};

export default LiveCall;
