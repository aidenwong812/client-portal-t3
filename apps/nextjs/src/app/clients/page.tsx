import type { Metadata } from "next"
import { redirect } from "next/navigation";
import { SideNav } from "@/components/sidenav"
import { Content } from "@/components/clients/content"
import { api } from "@/trpc/server";

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Clients",
  description: "Manage clients.",
};

const Page = async () => {
  const clients = await api.assistant.all();
  const user = await api.auth.me()
  if (!user)
    return
  const role = (await api.user.byEmail({ email: user.email! }))?.role;
  if (role === "CLIENT") redirect("/analytics")

  return (
    <div className="flex">
      <SideNav role={role!} />
      <Content initialData={clients} />
    </div>
  );
};

export default Page;
