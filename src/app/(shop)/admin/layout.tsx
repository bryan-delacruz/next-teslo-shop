import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth()

  console.log(session?.user.role);


  if (session?.user.role !== 'admin') {
    redirect('/login')
  }
  return (
    <>
      {children}
    </>
  );
}