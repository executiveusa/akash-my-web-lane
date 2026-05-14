export const GET = async () => {
  // Cron job keep-alive endpoint
  // This endpoint keeps the service alive during idle periods
  return new Response("OK", { status: 200 });
};
