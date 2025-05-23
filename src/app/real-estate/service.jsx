import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Set your API key here
  dangerouslyAllowBrowser: true,
});

export const extractBuyerData = async (messages) => {
  const prompt = `
You are an assistant extracting structured information from a chat conversation. Analyze the following conversation messages and extract the following details into a JSON object:
- First Name
- Last Name
- Email
- Phone Number
- Budget Range
- Financing Type (e.g., Cash, Mortgage, Pre-approved Loan)
- Preferred Property Type (e.g., House, Condo, Apartment)
- Preferred Location (City, State, ZIP Code)
- Number of Bedrooms
- Number of Bathrooms
- Move-in Timeline (Immediate, 3 months, 6 months, etc.)
- Additional Notes (any other relevant information about the buyer)

NEVER RETURN AN ERROR, if it's now found return the json but with empty string.

If any information is missing, return an empty string "". The JSON object should look like this:

{
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: "",
    financingType: "",
    preferredPropertyType: "",
    city: "",
    bedrooms: "2",
    bathrooms: "3",
    moveInTimeline: "",
    additionalNotes: "pool,garden,fireplace,calm",
}

Anything additional not present in those fields should be included in additionalNotes.

Here are the conversation messages:
${JSON.stringify(messages)}

Extract and return the JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { "type": "json_object" }
    });

    const extractedData = response.choices[0].message.content;

    try {
      return JSON.parse(extractedData); // Ensure the result is valid JSON
    } catch (err) {
      console.error("Failed to parse extracted data:", err);
      return null; // Handle invalid JSON
    }
  } catch (error) {
    console.error("Error extracting buyer data:", error);
    return null; // Handle API errors
  }
};

export const extractListingData = async (messages) => {
  const prompt = `
You are an assistant extracting structured information from a chat conversation. Analyze the following conversation messages and extract the following details into a JSON object:
- First Name 
- Last Name
- Email
- Is the property currently listed? (true/false)
- Property Type (e.g., House, Townhouse, Condo)
- Street Address
- City
- State
- ZIP Code (Look for it from the street and city adresss if possible)
- Surface Area (e.g., square footage)
- Number of Rooms
- Number of Bathrooms
- Notes (any aditional notes that might be relevant to keep about the client)

NEVER RETURN AN ERROR, if it's now found return the json but with empty string.

If any information is missing, return an empty string "". The JSON object should look like this:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890", // Static phone number
  "isListed": false,
  "propertyType": "House",
  "address": {
    "street": "123 Main St",
    "city": "Miami",
    "state": "FL",
    "zip": "33101"
  },
  "surface": 2000,
  "rooms": 4,
  "bathrooms": 3
  "notes" : "has a wife and goes to church on sundays"
}

Here are the conversation messages:
${JSON.stringify(messages)}

Extract and return the JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format : { "type": "json_object" }
    });

    const extractedData = response.choices[0].message.content;

    try {
      return JSON.parse(extractedData); // Ensure the result is valid JSON
    } catch (err) {
      console.error("Failed to parse extracted data:", err);
      return null; // Handle invalid JSON
    }
  } catch (error) {
    console.error("Error extracting listing data:", error);
    return null; // Handle API errors
  }
};

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the import path to your firebase.js file

export const saveToFirebase = async (listing, messages) => {
  try {
    const docRef = await addDoc(collection(db, "calls_history"), {
      listing,
      messages,
      timestamp: new Date().toISOString(),
    });
    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};


export const saveBuyerToFirebase = async (listing, messages) => {
  try {
    const docRef = await addDoc(collection(db, "buys_history"), {
      listing,
      messages,
      timestamp: new Date().toISOString(),
    });
    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateById = async (id, updatedData) => {
  try {
    const docRef = doc(db, "calls_history", id);

    // Update only the `listing` field within the document
    await updateDoc(docRef, {
      listing: updatedData, // Assuming `updatedData` contains `listing`
    });

    console.log("Document updated with ID:", id);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteById = async (id) => {
  try {
    const docRef = doc(db, "calls_history", id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const fetchHistoryCalls = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "calls_history"));
    const historyCalls = [];
    querySnapshot.forEach((doc) => {
      historyCalls.push({ id: doc.id, ...doc.data() });
    });
    console.log("Fetched History Calls:", historyCalls);
    return historyCalls;
  } catch (error) {
    console.error("Error fetching history calls:", error);
    throw error;
  }
};



export const getRecommendations = async (bedrooms = "", bathrooms = "", keywords = "") => {
  try {
    const response = await fetch(
      `/api/recommendations?bedrooms=${bedrooms}&bathrooms=${bathrooms}&keywords=${encodeURIComponent(keywords)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw recommendation response:", data);
    console.log("Recommendation response:", data.recommendations);
    return Array.isArray(data.recommendations) ? data.recommendations : [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};


export const fetchConversations = async () => {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/convai/conversations", {
      method: "GET",
      headers: {
        "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.status}`);
    }

    const data = await response.json();
    console.log("Conversations:", data);
    return data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return null;
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const initiateDatabase = async () => {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/convai/conversations", {
      method: "GET",
      headers: {
        "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const filtered = data.conversations
      .filter(conv => conv.agent_id === "Vedmd1vikHwnnogAwVbw")

    for (const conv of filtered) {
      const convId = conv.conversation_id;
      console.log(`Checking existence for conversation ID: ${convId}`);

      const docRef = doc(db, "calls_history", convId);
      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists()) {
        console.log(`🛑 First conversation ${convId} already exists. Halting processing.`);
        return;
      }

      if (conv.status == "failed") {
        return;
      }

      console.log(`Fetching details for conversation ID: ${convId}`);

      const detailRes = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${convId}`, {
        method: "GET",
        headers: {
          "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!detailRes.ok) {
        console.error(`Failed to fetch conversation ${convId}: ${detailRes.status}`);
        continue;
      }

      const detail = await detailRes.json();
      const messages = detail.transcript || [];

      const startTimeUnix = detail.metadata?.start_time_unix_secs;
      const formattedDate = startTimeUnix
        ? new Date(startTimeUnix * 1000).toLocaleDateString("en-GB")
        : "";

      const topic = await detectConversationPurpose(messages);
      console.log(`Detected topic for ${convId}: ${topic.topic}`);

      let extractedData = {};
      if (topic.topic === "buy") {
        extractedData = await extractBuyerData(messages);
      } else if (topic.topic === "sell") {
        extractedData = await extractListingData(messages);
      }

      await setDoc(docRef, {
        purpose: topic.topic,
        status: detail.status,
        messages: messages,
        [`${topic.topic}Data`]: extractedData,
        timestamp: new Date().toISOString(),
        date: formattedDate,
      });

      console.log(`✅ Saved conversation ${convId} with purpose: ${topic.topic}`);
      await delay(5000);
    }
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
};

const detectConversationPurpose = async (messages) => {
  const prompt = `
You are a classification assistant. Based on the messages below, decide whether the user's intent is to "buy" or "sell" a property.

Respond ONLY with a JSON object like:
{ "topic": "buy" } or { "topic": "sell" }

Messages:
${JSON.stringify(messages)}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error("Error detecting conversation purpose:", err);
    return { topic: "unknown" };
  }
};