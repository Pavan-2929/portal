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
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5 pt-10">
        {children}
      </div>
    </div>
  );
}
