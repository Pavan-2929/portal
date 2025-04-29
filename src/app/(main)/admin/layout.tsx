import Navbar from "@/components/Navbar";
import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect("/");
  }

  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}
