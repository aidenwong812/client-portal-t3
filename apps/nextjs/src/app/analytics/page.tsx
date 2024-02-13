import type { Metadata } from "next"
import { redirect } from "next/navigation";
import { SideNav } from "@/components/sidenav"
import { Content } from "@/components/analytics/content";
import { api } from "@/trpc/server";

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Analytics",
  description: "anaylze the usage of project.",
};

const Page = async () => {
  const user = await api.auth.me()
  const assistant = await api.assistant.byClientEmail({ email: user?.email ?? "" })
  if (!user || !assistant)
    return
  const role = (await api.user.byEmail({ email: user.email! }))?.role;
  if (role === "AGENCY") redirect("/clients")

  return (
    <div className="flex">
      <SideNav role={role!} />
      <Content projectID={assistant.projectId} apiKey={assistant.apiKey} />
    </div>
  );
};

export default Page;
