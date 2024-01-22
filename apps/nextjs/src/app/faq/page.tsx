import type { Metadata } from "next"
import { SideNav } from "@/components/sidenav"
import { Content } from "@/components/faq/content"

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Clients",
  description: "Manage clients.",
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
