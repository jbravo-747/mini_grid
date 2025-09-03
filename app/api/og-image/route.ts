export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  if (!target) {
    return new Response(JSON.stringify({ ok: false, error: "Missing url" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  try {
    const res = await fetch(target, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
      redirect: "follow",
      cache: "no-store",
    });
    const html = await res.text();

    const pick = (...patterns: RegExp[]) => {
      for (const re of patterns) {
        const m = html.match(re);
        if (m?.[1]) return m[1].trim().replace(/&amp;/g, "&");
      }
      return null;
    };

    const pick = (...patterns: RegExp[]) => {
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].trim().replace(/&amp;/g, "&");
  }
  return null;
};

const img =
  pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
       /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i,
       /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
  pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
       /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);

const title =
  pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i,
       /<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
  pick(/<title>([^<]+)<\/title>/i) ||
  null;

const absolute = img ? new URL(img, target).href : null;
return new Response(JSON.stringify({ ok: true, image: absolute, title }), {
JSON.stringify({ ok: true, image: absolute }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=86400",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Fetch failed" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
