import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {children}
    </div>
  );
}
