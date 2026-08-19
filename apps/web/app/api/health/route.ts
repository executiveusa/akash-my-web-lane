export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "myweblane-web",
    timestamp: new Date().toISOString(),
  });
}
