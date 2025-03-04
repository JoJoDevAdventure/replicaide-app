"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample Data for the chart
const data = [
  { date: "Feb 02", calls: 5 },
  { date: "Feb 06", calls: 10 },
  { date: "Feb 14", calls: 15 },
  { date: "Feb 18", calls: 50 },
  { date: "Feb 22", calls: 10 },
  { date: "Mar 02", calls: 55 },
];

const stats = [
  { label: "Number of calls", value: "132" },
  { label: "Average duration", value: "1:05" },
  { label: "Total cost", value: "73,313 credits" },
  { label: "Average cost", value: "555 credits/call" },
];

export default function StatsGrid() {
  return (
    <div>
      {/* AreaChart-Gradient */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Call Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="black" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="black" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="calls" stroke="black" fill="url(#gradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}