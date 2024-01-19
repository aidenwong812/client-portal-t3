import type { Metadata } from "next"
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import { SideNav } from "@/components/sidenav"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@acme/ui/card"
import { Input } from "@acme/ui/input"
import { KnowledgeBaseTable } from "@/components/knowledge-base/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@acme/ui/dropdown-menu"
import { Button } from "@acme/ui/button"
import { KnowledgeBasePreviewDialog } from "@/components/knowledge-base/preview-dialog"
import { AddKnowledgeBaseDialog } from "@/components/knowledge-base/knowledge-dialog"

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
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <KnowledgeBasePreviewDialog />
            </div>
            <div className="flex items-center space-x-2">
              <AddKnowledgeBaseDialog />
            </div>
          </div>
        </div>

        <Card className="h-full">
          <CardHeader className="flex-row justify-between border-b p-3">
            <div className="flex items-center w-1/3 relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-1" />
              <Input className="pl-6 border-none focus:outline-none" placeholder="Search for FAQ Sets" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col p-3 gap-3">
            <CardTitle className="text-xl pl-2">
              Data Sources
            </CardTitle>
            <KnowledgeBaseTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
