"use client";

import StockContext from "@/context/StockContext";
import { ChartData } from "@/lib/types";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { FC, useContext } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {}

export const Chart: FC<ChartProps> = ({}) => {
  const { currentStock } = useContext(StockContext);
  const data = currentStock?.prices ?? [];

  return (
    <Line
      className="h-full"
      height="100%"
      options={{
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        maintainAspectRatio: false,
        parsing: {
          xAxisKey: "date",
          yAxisKey: "price",
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (data) => {
                return "Price: " + data.raw.price;
              },
              afterLabel: (data) => {
                return "Change: " + data.raw.change;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Price",
            },
          },
        },
      }}
      data={{
        datasets: [
          {
            label: "Stock data",
            borderColor: "blue",
            backgroundColor: "blue",
            data: data.map((item) => ({
              price: item.price,
              change: item.changePercent,
              date: item.date,
            })),
          },
        ],
      }}
    ></Line>
  );
};
