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
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="mb-16 flex-1 space-y-10 p-5 md:p-7 md:pe-7 lg:pe-16">
          {children}
        </div>
      </div>
    </div>
  );
}
