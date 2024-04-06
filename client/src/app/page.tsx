import { Chart } from "@/components/Chart";
import { Chat } from "@/components/Chat";
import { DashboardTopInfo } from "@/components/DashboardTopInfo";
import OccupyRestWindowHeight from "@/components/OccupyRestWindowHeight";
import DashboardActions from "@/components/DashboardActions";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <OccupyRestWindowHeight>
      <main className="flex p-8 h-full">
        <div className="w-full h-full flex gap-6 flex-col">
          <div className="dashboard-top-info">
            <DashboardTopInfo />
          </div>
          <Separator />
          <div className="h-full grid grid-cols-12">
            <div className="h-full col-span-8">
              <Chart
                data={[
                  {
                    date: new Date("2002/03/24").toLocaleDateString(),
                    name: "Stock",
                    price: 100.5,
                    changePercent: "-10%",
                  },
                  {
                    date: new Date("2004/03/24").toLocaleDateString(),
                    name: "Stock",
                    price: 300.5,
                    changePercent: "-10%",
                  },
                  {
                    date: new Date().toLocaleDateString(),
                    name: "Stock",
                    price: 180.5,
                    changePercent: "10%",
                  },
                ]}
              />
            </div>
            <DashboardActions />
          </div>
        </div>
        <Chat className="w-4/12 hidden"></Chat>
      </main>
    </OccupyRestWindowHeight>
  );
}
