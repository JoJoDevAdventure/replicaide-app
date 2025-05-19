"use client";

import { onAuthStateChanged } from "firebase/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../firebase";
// (Assumes Firebase app is initialised elsewhere in your project startup)

// Dynamically import the Loading component
const Loading = dynamic(() => import("@/Components/Loading"), {
  ssr: false,
});

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/call-center");
      } else {
        router.replace("/auth");
      }
    });

    // Cleanup on unmount
    return () => unsub();
  }, [router]);

  return <Loading />; // Shows while we check Firebase auth state
};

export default Home;