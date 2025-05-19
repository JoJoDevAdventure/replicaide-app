"use client";

"use client";

import { appState } from "@/appState";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../../firebase";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const confirmLogout = window.confirm("Do you want to logout?");
    
    if (confirmLogout) {
      appState.isAuth = false;
      signOut(auth).finally(() => {
        router.push("/");
      });
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return null; // No UI is needed for this page
};

export default LogoutPage;