"use client";

import Loading from "@/Components/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/call-center"); // Redirect to /auth if not authenticated
  });

  return (
    <Loading /> // Optional loading message
  );
};

export default Home;
