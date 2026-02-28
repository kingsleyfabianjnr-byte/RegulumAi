"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Card from "@/components/ui/Card";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = (session?.user as any)?.accessToken;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setMessage("");

    try {
      await api("/users/me", {
        method: "PATCH",
        token,
        body: JSON.stringify({ name }),
      });
      await update({ name });
      setMessage("Profile updated successfully.");
    } catch (err: any) {
      setMessage(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Settings</h1>

      <Card className="max-w-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Profile</h2>

        {message && (
          <div className="mb-4 rounded-lg border border-primary-200 bg-primary-50 p-3 text-sm text-primary-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm transition-colors focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </Card>
    </div>
  );
}
