import { getUser } from "@/utils/getUser";
import React from "react";

const page = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
};

export default page;
