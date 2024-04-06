import { Chart } from "@/components/Chart";
import { Chat } from "@/components/Chat";
import { DashboardTopInfo } from "@/components/DashboardTopInfo";
import OccupyRestWindowHeight from "@/components/OccupyRestWindowHeight";
import DashboardActions from "@/components/DashboardActions";

export default function Home() {
  return (
    <OccupyRestWindowHeight>
      <main className="flex p-8 h-full">
        <div className="w-full h-full flex flex-col">
          <div className="dashboard-top-info border border-slate">
            <DashboardTopInfo />
          </div>
          <div className="h-full grid grid-cols-12 border border-slate">
            <div className="h-full col-span-8 border border-slate">
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
            <DashboardActions/>
          </div>
        </div>
        <Chat className="w-4/12 hidden"></Chat>
      </main>
    </OccupyRestWindowHeight>
  );
}
