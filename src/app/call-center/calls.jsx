"use client";
import { Device } from "@twilio/voice-sdk";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FiHeadphones, FiPhoneCall, FiRefreshCw } from "react-icons/fi";

// Format raw phone strings to +1(AAA)BBB‑BBBB
function formatPhoneNumber(raw = "") {
  const digits = raw.replace(/[^\d]/g, "");
  // Ensure we have 10 or 11 digits; drop leading 1 if present
  const d =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (d.length !== 10) return raw; // fallback – return as‑is
  const area = d.slice(0, 3);
  const prefix = d.slice(3, 6);
  const line = d.slice(6);
  return `+1(${area})${prefix}-${line}`;
}

const STATUS_META = {
  "on track": { dot: "bg-green-500", label: "On Track" },
  "at risk": { dot: "bg-orange-400", label: "At Risk" },
  "human needed": { dot: "bg-red-500", label: "Human Needed" },
};

function StatusBadge({ status = "on track" }) {
  const meta = STATUS_META[status.toLowerCase()] ?? STATUS_META["on track"];
  return (
    <div className="flex items-center min-w-[80px] space-x-1 text-gray-800">
      <span
        className={clsx("inline-block w-2.5 h-2.5 rounded-full", meta.dot)}
      />
      <span className="text-xs capitalize text-gray-700 text-gray-700">
        {meta.label}
      </span>
    </div>
  );
}

async function initTwilioDevice() {
  const res = await fetch("/api/token");
  const { token } = await res.json();

  // Initialise Voice SDK device
  const device = new Device(token, {
    debug: true,
    codecPreferences: ["mulaw"],
  });

  // v2.x of @twilio/voice-sdk requires an explicit register()
  await device.register();

  return device;
}

export default function LiveCalls() {
  const [calls, setCalls] = useState([]);

  const fetchCalls = async () => {
    const res = await fetch("/api/live-calls");
    const data = await res.json();

    // Normalize phone numbers in fetched list
    const normalized = Array.isArray(data)
      ? data.map((c) => ({
          ...c,
          from: formatPhoneNumber(c.from ?? ""),
          to: formatPhoneNumber(c.to ?? ""),
        }))
      : [];

    const timestamp = Date.now();
    const statusCycle = ["on track", "at risk", "human needed"];
    const mocked = [0, 1, 2].map((i) => ({
      sid: `mock-${timestamp}-${i}`,
      from: formatPhoneNumber("55529401" + (i + 10)),
      to: "AI Agent",
      startTime: new Date().toISOString(),
      status: statusCycle[i], // 0 → on track, 1 → at risk, 2 → human needed
    }));
    console.log(data);
    if (Array.isArray(data)) {
      setCalls([...normalized, ...mocked]);
    } else {
      console.warn("Unexpected response from /api/live-calls:", data);
      setCalls([...[], ...mocked]);
    }
  };

  const joinCall = async () => {
    try {
      const device = await initTwilioDevice();
      // Outgoing params are forwarded to your TwiML App
      const connection = device.connect({ room: "ai_room", muted: "false" });
      console.log("📞 Joined call (talk mode)", connection);
    } catch (err) {
      console.error("❌ joinCall failed", err);
    }
  };

  const listenToCall = async () => {
    try {
      console.log("🔊 Starting listenToCall…");
      const device = await initTwilioDevice();
      const connection = device.connect({ room: "ai_room", muted: "true" });
      console.log("👂 Listening (muted)", connection);
    } catch (err) {
      console.error("❌ listenToCall failed", err);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="p-6">
      <div className="grid gap-4">
        <div className="hidden md:grid grid-cols-4 gap-4 font-semibold text-gray-600 px-4">
          <div>Status</div>
          <div>Call</div>
          <button
            onClick={() => fetchCalls()}
            className="text-p1 hover:text-p1/50 flex items-center"
            title="Refresh"
          >
            Refresh
            <FiRefreshCw className="ml-4 w-5 h-5" />
          </button>
        </div>
        {calls.map((call) => (
          <div
            key={call.sid}
            className="border rounded-lg shadow p-4 flex flex-col md:grid md:grid-cols-4 md:items-center gap-4"
          >
            <StatusBadge status={call.status || "on track"} />

            <div className="md:col-span-2">
              <div className="font-medium text-black">From: {call.from}</div>
              <div className="text-sm text-gray-500">
                To: {call.to} • {new Date(call.startTime).toLocaleString()}
              </div>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0 md:justify-end">
              <button
                onClick={joinCall}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center"
              >
                <FiPhoneCall className="w-4 h-4 mr-1" />
                Join
              </button>
              <button
                onClick={listenToCall}
                className="bg-p1 hover:bg-p1/50 text-white px-3 py-2 rounded flex items-center"
              >
                <FiHeadphones className="w-4 h-4 mr-1" />
                Listen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
