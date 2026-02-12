"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Card from "@/components/ui/Card";
import { api } from "@/lib/api";

interface ComplianceCheck {
  id: string;
  title: string;
  status: string;
  riskLevel: string | null;
  aiAnalysis: string | null;
  createdAt: string;
}

export default function CompliancePage() {
  const { data: session } = useSession();
  const [checks, setChecks] = useState<ComplianceCheck[]>([]);
  const [title, setTitle] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [error, setError] = useState("");

  const token = (session?.user as any)?.accessToken;

  async function loadChecks() {
    if (!token) return;
    try {
      const data = await api<ComplianceCheck[]>("/compliance", { token });
      setChecks(data);
    } catch {
      // silent fail on load
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError("");
    setLoading(true);

    try {
      await api("/compliance", {
        method: "POST",
        token,
        body: JSON.stringify({ title, documentText }),
      });
      setTitle("");
      setDocumentText("");
      await loadChecks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyze(checkId: string) {
    if (!token) return;
    setAnalyzing(checkId);

    try {
      await api(`/compliance/${checkId}/analyze`, {
        method: "POST",
        token,
      });
      await loadChecks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAnalyzing(null);
    }
  }

  // Load checks on mount
  useState(() => {
    loadChecks();
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-gray-100 text-gray-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLIANT: "bg-green-100 text-green-700",
    NON_COMPLIANT: "bg-red-100 text-red-700",
    NEEDS_REVIEW: "bg-orange-100 text-orange-700",
  };

  const riskColors: Record<string, string> = {
    LOW: "text-green-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-orange-600",
    CRITICAL: "text-red-600",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Compliance Monitoring
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* New Check Form */}
      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          New Compliance Check
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Q1 2025 KYC Policy Review"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Document Text
            </label>
            <textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              rows={6}
              placeholder="Paste the document or policy text to analyze..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Check"}
          </button>
        </form>
      </Card>

      {/* Checks List */}
      <div className="space-y-4">
        {checks.length === 0 ? (
          <Card>
            <p className="py-8 text-center text-gray-400">
              No compliance checks yet. Create one above to get started.
            </p>
          </Card>
        ) : (
          checks.map((check) => (
            <Card key={check.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{check.title}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[check.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {check.status.replace("_", " ")}
                    </span>
                    {check.riskLevel && (
                      <span
                        className={`text-xs font-medium ${
                          riskColors[check.riskLevel] || "text-gray-600"
                        }`}
                      >
                        Risk: {check.riskLevel}
                      </span>
                    )}
                  </div>
                  {check.aiAnalysis && (
                    <p className="mt-2 text-sm text-gray-600">
                      {check.aiAnalysis}
                    </p>
                  )}
                </div>
                {check.status === "PENDING" && (
                  <button
                    onClick={() => handleAnalyze(check.id)}
                    disabled={analyzing === check.id}
                    className="rounded-lg border border-primary-300 px-4 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50 disabled:opacity-50"
                  >
                    {analyzing === check.id ? "Analyzing..." : "Run AI Analysis"}
                  </button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
