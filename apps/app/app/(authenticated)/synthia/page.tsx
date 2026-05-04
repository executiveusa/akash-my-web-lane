export default function SynthiaPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ae-gold)" }}>
          SYNTHIA Gateway
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          LLM router — smart (Claude Sonnet) · fast (Nemotron) · research (Gemini)
        </p>
      </div>
      <div className="ae-grid-bg rounded-xl border border-white/10 p-8 text-center text-muted-foreground">
        Token spend analytics, model routing logs, and prompt library — coming soon.
      </div>
    </div>
  );
}
