import type { Metadata } from "next"
import { SideNav } from "@/components/sidenav"
import { ClientDialog } from "@/components/clients/dialog"
import { ProfileCard } from "@/components/account/profile";
import { WhitelabelCard } from "@/components/account/whitelabel";
import { PlanCard } from "@/components/account/plan";

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage account",
};

const Page = async () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-1 flex-col gap-6 px-12 py-8 h-screen overflow-y-auto">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
          <div className="flex items-center space-x-2">
            <ClientDialog />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/3">
              <ProfileCard />
            </div>
            <div className="w-2/3">
              <WhitelabelCard />
            </div>
          </div>
          <div>
            <PlanCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
