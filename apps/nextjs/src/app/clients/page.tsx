import type { Metadata } from "next"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { SideNav } from "@/components/sidenav"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@acme/ui/card"
import { Input } from "@acme/ui/input"
import { ClientTable } from "@/components/clients/table"
import { ClientDialog } from "@/components/clients/dialog"

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Clients",
  description: "Manage clients.",
};

const Page = async () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-1 flex-col gap-6 px-12 py-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Client Management</h2>
          <div className="flex items-center space-x-2">
            <ClientDialog />
          </div>
        </div>

        <Card className="h-full">
          <CardHeader className="flex-row justify-between border-b p-3">
            <div className="flex items-center w-1/3 relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-1" />
              <Input className="pl-6 border-none focus:outline-none" placeholder="Search for clients" />
            </div>
            <div>
              <p>Client Limit: 1 / 3</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col p-3 gap-3">
            <CardTitle className="text-xl pl-2">
              Client List
            </CardTitle>
            <ClientTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
