import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { InfoIcon } from "lucide-react";
import GoogleAuth from "./GoogleAuth";

const AuthPage = () => {
  return (
    <Card className="flex max-w-[500px]">
      <CardHeader className="text-center">
        <CardTitle className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Gandhinagar University"
            height={85}
            width={110}
          />
        </CardTitle>
        <CardDescription>Get Access to Student Portal</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <GoogleAuth />
      </CardContent>
      <CardFooter className="text-muted-foreground flex items-center gap-2">
        <InfoIcon className="size-4" />
        Only @gandhinagaruni.ac.in email IDs are allowed
      </CardFooter>
    </Card>
  );
};

export default AuthPage;
