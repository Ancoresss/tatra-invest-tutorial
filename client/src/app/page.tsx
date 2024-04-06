import { Chat } from "@/components/Chat";
import { DashboardTopInfo } from "@/components/DashboardTopInfo";
import OccupyRestWindowHeight from "@/components/OccupyRestWindowHeight";

export default function Home() {
  return (
    <OccupyRestWindowHeight>
      <main className="flex p-8 h-full">
        <div className="w-full h-full flex flex-col">
          <div className="dashboard-top-info border border-slate">
            <DashboardTopInfo />
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
