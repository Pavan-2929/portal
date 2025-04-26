"use client";

import LoadingButton from "@/components/common/LoadingButton";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const handleGoogleAuth = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          setLoading(false);
          console.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <LoadingButton
      loading={loading}
      onClick={handleGoogleAuth}
      className="gap-5"
    >
      <FaGoogle className="size-4" />
      Login with Google
    </LoadingButton>
  );
};

export default GoogleAuth;
