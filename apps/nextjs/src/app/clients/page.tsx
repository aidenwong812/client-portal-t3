import type { Metadata } from "next"
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

  return (
    <div className="flex">
      <SideNav />
      <Content initialData={clients} />
    </div>
  );
};

export default Page;
