"use client";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { date: "Feb 02", calls: 5 },
  { date: "Feb 06", calls: 10 },
  { date: "Feb 14", calls: 15 },
  { date: "Feb 18", calls: 50 },
  { date: "Feb 22", calls: 10 },
  { date: "Mar 02", calls: 55 },
];

export default function DashboardChart() {
  return (
    <ChartContainer config={{}} className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="calls" fill="var(--color-primary)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}