'use client';

import React, { useEffect, useState } from "react";
import links from "@/data/links.json";

export type SourceType = "IMCO" | "El Universal";

export interface GridItem {
  id: string | number;
  title: string;
  source: SourceType;
  url: string;
  image?: string;
  summary?: string;
  date?: string;
}

const SOURCE_STYLES: Record<SourceType, string> = {
  IMCO: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  "El Universal": "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};

const LOGO_URLS: Record<SourceType, string> = {
  IMCO: "https://imco.org.mx/favicon.ico",
  "El Universal": "https://www.eluniversal.com.mx/favicon.ico",
};

const DEFAULT_ITEMS: GridItem[] = [
  ...links.imco.map((url: string, i: number) => ({
    id: `imco-${i + 1}`,
    title: new URL(url).hostname.replace(/^www\./, ""),
    source: "IMCO" as const,
    url,
  })),
  ...links.el_universal.map((url: string, i: number) => ({
    id: `eluni-${i + 1}`,
    title: new URL(url).hostname.replace(/^www\./, ""),
    source: "El Universal" as const,
    url,
  })),
];

function SourceBadge({ source }: { source: SourceType }) {
  return (
    <span
      className={
        "pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium shadow-sm " +
        SOURCE_STYLES[source]
      }
      aria-label={`Fuente: ${source}`}
    >
      {source}
    </span>
  );
}

function LogoBadge({ source }: { source: SourceType }) {
  const src = LOGO_URLS[source];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Logo ${source}`}
      className="absolute right-2 top-2 h-5 w-5 rounded-sm ring-1 ring-white/70 shadow"
      loading="lazy"
    />
  );
}

function Card({ item }: { item: GridItem }) {
  return (
    <article className="group relative h-[170px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500">
      <div className="relative h-20 w-full bg-slate-100">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <span className="text-sm">Sin imagen</span>
          </div>
        )}
        <SourceBadge source={item.source} />
        <LogoBadge source={item.source} />
      </div>

      <div className="flex min-h-0 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none"
            aria-label={`${item.title} — abrir enlace en nueva pestaña`}
          >
            {item.title}
          </a>
        </h3>

        {item.summary && (
          <p className="line-clamp-2 text-xs text-slate-600">{item.summary}</p>
        )}

        <div className="mt-0.5 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate" title={item.source}>
            {item.source}
          </span>
          {item.date && (
            <time dateTime={item.date} className="ml-3 shrink-0">
              {item.date}
            </time>
          )}
        </div>

        <div className="mt-2">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Ver investigación: ${item.title}`}
          >
            Ver investigación
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M13.5 4.5a.75.75 0 0 0 0 1.5h4.19l-9.22 9.22a.75.75 0 1 0 1.06 1.06l9.22-9.22V11a.75.75 0 0 0 1.5 0V4.5H13.5Z" />
              <path d="M6 5.25A2.25 2.25 0 0 0 3.75 7.5v12A2.25 2.25 0 0 0 6 21.75h12A2.25 2.25 0 0 0 20.25 19.5v-7.5a.75.75 0 0 0-1.5 0v7.5c0 .414-.336.75-.75.75H6a.75.75 0 0 1-.75-.75v-12c0-.414.336-.75.75-.75h7.5a.75.75 0 0 0 0-1.5H6Z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function MiniGridAranceles({ items = DEFAULT_ITEMS }: { items?: GridItem[] }) {
  const [resolvedItems, setResolvedItems] = useState<GridItem[]>(items);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const updated = await Promise.all(
        items.map(async (it) => {
          if (it.image && it.title) return it;
          try {
            const r = await fetch(`/api/og-image?url=${encodeURIComponent(it.url)}`, { cache: "no-store" });
            if (!r.ok) return it;
            const data = await r.json();
            if (data?.image || data?.title) {
              return {
                ...it,
                image: (data.image as string) || it.image,
                title: (data.title as string) || it.title,
              } as GridItem;
            }
          } catch {
            // silencio: si falla la extracción, usamos fallback
          }
          return it;
        })
      );
      if (mounted) setResolvedItems(updated);
    })();
    return () => {
      mounted = false;
    };
  }, [items]);

  return (
    <section className="w-[900px] h-[400px] overflow-hidden p-2">
      <div className="flex h-full flex-col">
        <h3 className="mb-1 text-[14px] font-semibold text-slate-900">
          Principales Investigaciones del IMCO
        </h3>
        <div className="mb-1 grid flex-none grid-cols-3 gap-2">
          {resolvedItems
            .filter((it) => it.source === "IMCO")
            .slice(0, 3)
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
        </div>

        <h3 className="mb-1 mt-1 text-[12px] font-semibold text-slate-900">
          Principales notas de El Universal
        </h3>
        <div className="grid flex-none grid-cols-3 gap-2">
          {resolvedItems
            .filter((it) => it.source === "El Universal")
            .slice(0, 3)
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
        </div>
      </div>
    </section>
  );
}
