"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
      });

      console.log(result);

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="flex items-center gap-3"
    >
      {loading ? (
        <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
      ) : (
        <FaGoogle className="text-muted-foreground size-4" />
      )}
      Sign In with Google
    </Button>
  );
};

export default GoogleAuth;
