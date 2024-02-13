import type { Metadata } from "next"
import { SideNav } from "@/components/sidenav"
import { Content } from "@/components/analytics/content";

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Analytics",
  description: "anaylze the usage of project.",
};

const Page = async () => {
  return (
    <div className="flex">
      <SideNav />
      <Content />
    </div>
  );
};

export default Page;
