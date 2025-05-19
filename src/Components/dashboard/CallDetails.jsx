import { AnimatePresence, motion } from "framer-motion";
import LiveBuyingInfo from "./LiveBuyingInfo";
import LiveListingInfo from "./LiveListingInfo";
import LiveTranscript from "./LiveTranscript";

const CallDetails = ({ callDetails, setCallDetails, onDeleteCall, onSaveCall }) => {
  if (!callDetails) return null; // Do not render anything if callDetails is null

  return (
    <AnimatePresence>
      {callDetails && (
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCallDetails(null)}
        >
          <motion.div
            className={`absolute  overflow-y-scroll md:pb-0 pb-22 ${
              window.innerWidth < 640 ? "inset-0" : "right-0 w-1/3"
            } h-full bg-white`}
            initial={{ x: window.innerWidth < 640 ? "100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth < 640 ? "100%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation() } // Prevent background click from triggering close
          >
            {/* Custom Back Button */}
            <button
              className="flex items-center gap-2 text-orange-500 px-4 py-2 hover:text-orange-700"
              onClick={() => setCallDetails(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M520-160 200-480l320-320 56 56-224 224h488v80H352l224 224-56 56Z" />
              </svg>
              Back
            </button>

            {/* Call Details Content */}
            <div className="p-4 space-y-6">
              {callDetails?.purpose === "sell" ? (
                <LiveListingInfo
                  parsedListing={callDetails?.sellData || null}
                  isLive={false}
                  onDeleteCall={onDeleteCall}
                  onSave={(finalData) => onSaveCall(finalData)}
                />
              ) : (
                <LiveBuyingInfo
                parsedListing={callDetails?.buyData}
                  isLive={false}
                  onDeleteCall={onDeleteCall}
                  onSave={(finalData) => onSaveCall(finalData)}
                />
              )}
              <LiveTranscript messages={callDetails?.messages || []} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallDetails;