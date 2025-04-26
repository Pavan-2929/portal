"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./common/UserAvatar";
import Link from "next/link";
import { LogOutIcon, UserIcon } from "lucide-react";
import useSession from "@/utils/useSession";
import { Skeleton } from "./ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const { user, isPending } = useSession();

  if (!user || isPending) {
    return <Skeleton className="h-12 w-12 rounded-full" />;
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/auth");
        },
        onError: () => {},
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("cursor-pointer rounded-full", className)}>
          <UserAvatar avatarUrl={user.image} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/${user.name}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-3 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-3 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
