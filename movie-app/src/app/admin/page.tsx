"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, Users, BarChart3, Film, Tag } from "lucide-react";
import { ALL_TITLES, GENRES, getHomeRows } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Analytics", icon: BarChart3 },
  { id: "featured", label: "Featured Content", icon: Film },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "rows", label: "Homepage Rows", icon: LayoutGrid },
  { id: "users", label: "Users", icon: Users },
] as const;

const MOCK_USERS = [
  { name: "Jordan Blake", email: "jordan@example.com", plan: "Premium", joined: "Jan 2024" },
  { name: "Sasha Cole", email: "sasha@example.com", plan: "Standard", joined: "Mar 2024" },
  { name: "Riya Nair", email: "riya@example.com", plan: "Premium", joined: "Jun 2024" },
  { name: "Marcus Webb", email: "marcus@example.com", plan: "Free", joined: "Aug 2024" },
];

const ANALYTICS = [
  { label: "Active Users", value: "24,801", delta: "+4.2%" },
  { label: "Watch Hours (7d)", value: "118,204", delta: "+2.8%" },
  { label: "New Signups", value: "1,204", delta: "+11.6%" },
  { label: "Avg. Session", value: "38m", delta: "-1.1%" },
];

export default function AdminPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");

  return (
    <div className="mx-auto flex max-w-[1400px] gap-6 px-4 pb-16 pt-8 sm:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <h2 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-muted">Admin</h2>
        <nav className="space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                tab === id ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        {tab === "overview" && (
          <div>
            <h1 className="mb-6 text-2xl font-semibold text-white">Analytics Overview</h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {ANALYTICS.map((a) => (
                <div key={a.label} className="rounded-lg border border-line bg-surface p-4">
                  <p className="text-xs text-muted">{a.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{a.value}</p>
                  <p className={cn("mt-1 text-xs", a.delta.startsWith("-") ? "text-red-400" : "text-green-400")}>
                    {a.delta} vs last week
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mb-3 mt-8 text-lg font-semibold text-white">Top Titles by Rating</h2>
            <div className="space-y-2 rounded-lg border border-line bg-surface p-4">
              {[...ALL_TITLES]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map((t) => (
                  <div key={`${t.mediaType}-${t.id}`} className="flex items-center gap-3">
                    <span className="w-40 shrink-0 truncate text-sm text-white">{t.title}</span>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(t.rating / 10) * 100}%` }} />
                    </div>
                    <span className="w-10 text-right text-xs text-muted">{t.rating.toFixed(1)}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {tab === "featured" && (
          <div>
            <h1 className="mb-6 text-2xl font-semibold text-white">Manage Featured Content</h1>
            <div className="space-y-3">
              {ALL_TITLES.slice(0, 8).map((t) => (
                <div key={`${t.mediaType}-${t.id}`} className="flex items-center gap-4 rounded-lg border border-line bg-surface p-3">
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded">
                    <Image src={t.posterPath} alt={t.title} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{t.title}</p>
                    <p className="text-xs text-muted">{t.releaseYear} · {t.mediaType}</p>
                  </div>
                  <button className="rounded-md border border-line px-3 py-1.5 text-xs text-white hover:bg-surfaceHover">
                    Set as Featured
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div>
            <h1 className="mb-6 text-2xl font-semibold text-white">Manage Categories</h1>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <span key={g.id} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-white">
                  {g.name}
                </span>
              ))}
              <button className="rounded-full border border-dashed border-accent px-4 py-2 text-sm text-accent">
                + Add Category
              </button>
            </div>
          </div>
        )}

        {tab === "rows" && (
          <div>
            <h1 className="mb-6 text-2xl font-semibold text-white">Homepage Rows</h1>
            <div className="space-y-2">
              {getHomeRows().map((row) => (
                <div key={row.id} className="flex items-center justify-between rounded-lg border border-line bg-surface p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{row.title}</p>
                    <p className="text-xs text-muted">{row.items.length} titles</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-md border border-line px-3 py-1.5 text-xs text-white hover:bg-surfaceHover">Edit</button>
                    <button className="rounded-md border border-line px-3 py-1.5 text-xs text-white hover:bg-surfaceHover">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div>
            <h1 className="mb-6 text-2xl font-semibold text-white">Users</h1>
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Plan</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((u) => (
                    <tr key={u.email} className="border-t border-line">
                      <td className="px-4 py-3 text-white">{u.name}</td>
                      <td className="px-4 py-3 text-muted">{u.email}</td>
                      <td className="px-4 py-3 text-white">{u.plan}</td>
                      <td className="px-4 py-3 text-muted">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
