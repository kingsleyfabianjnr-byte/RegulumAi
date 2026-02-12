"use client";

import Card from "@/components/ui/Card";

const stats = [
  { label: "Total Checks", value: "0", change: "No data yet" },
  { label: "Compliant", value: "0", change: "No data yet" },
  { label: "Needs Review", value: "0", change: "No data yet" },
  { label: "High Risk", value: "0", change: "No data yet" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-400">{stat.change}</p>
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
              className="text-primary-600 hover:underline"
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
