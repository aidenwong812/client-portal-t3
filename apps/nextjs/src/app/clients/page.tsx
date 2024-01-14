import type { Metadata } from "next"
import { PlusIcon } from "@radix-ui/react-icons"
import { SideNav } from "@/components/sidenav"
import { Button } from "@acme/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@acme/ui/card"

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "Clients",
  description: "Manage clients.",
};

const Page = async () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 px-12 py-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Client Management</h2>
          <div className="flex items-center space-x-2">
            <Button className="uppercase rounded-xl flex gap-1 items-center">
              <PlusIcon className="w-4 h-4" />
              New Client
            </Button>
          </div>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
