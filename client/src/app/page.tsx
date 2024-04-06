import { Chat } from "@/components/Chat";
import OccupyRestWindowHeight from "@/components/OccupyRestWindowHeight";
import { StocksMenu } from "@/components/StocksMenu";
import { Separator } from "@/components/ui/separator";
import { useChatStorage } from "@/lib/storage/chatStorage";

export default function Home() {
  return (
    <OccupyRestWindowHeight>
      <main className="flex p-8 h-full">
        <div className="w-full h-full flex flex-col">
          <div className="dashboard-top-info border border-slate">
            <div className="relative mr-4">
              <StocksMenu />
              <Separator orientation="vertical" className="absolute h-full top-0 -right-4" />
            </div>
          </div>
          <div className="h-full grid grid-cols-12 border border-slate">
            <div className="col-span-8 border border-slate"></div>
            <div className="col-span-4 border border-slate"></div>
          </div>
        </div>
        <Chat className="w-4/12 chat border border-slate"></Chat>
      </main>
    </OccupyRestWindowHeight>
  );
}
