"use client";

import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";

const stats = [
  {
    label: "Monitoring Time Saved",
    value: "60%",
    change: "+8% this quarter",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: "Sources Tracked",
    value: "52",
    change: "+2 this week",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    label: "Compliance Score",
    value: "92%",
    change: "+3% vs last month",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: "Avg Alert Speed",
    value: "<24hr",
    change: "4hr faster",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div>
      {/* Welcome Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-navy-950 to-navy-900 p-8">
        <h1 className="text-2xl font-bold text-white">
          Good morning, {firstName}
        </h1>
        <p className="mt-2 text-gray-300">
          You have{" "}
          <span className="font-semibold text-primary-400">
            5 pending action items
          </span>{" "}
          and{" "}
          <span className="font-semibold text-amber-400">
            2 critical deadlines
          </span>{" "}
          this month.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            4 trials on track
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            1 at risk
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-primary-400">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
            3 reports ready
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-0.5 text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Activity
        </h2>
        <div className="flex items-center justify-center py-12 text-gray-400">
          <p>
            No compliance checks yet. Go to{" "}
            <a
              href="/dashboard/compliance"
              className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Compliance
            </a>{" "}
            to run your first check.
          </p>
        </div>
      </Card>
    </div>
  );
}
