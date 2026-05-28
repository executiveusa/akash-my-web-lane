"use client";

import { useCallback, useEffect, useState } from "react";

interface HealthState {
  ok: boolean | null;
  status?: number;
  error?: string;
  proxyUrl?: string;
}

export function LLMProxyToggle() {
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [health, setHealth] = useState<HealthState>({ ok: null });
  const [lastCheck, setLastCheck] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("llm_proxy_enabled");
    if (saved !== null) setEnabled(saved === "true");
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("llm_proxy_enabled", String(next));
    window.dispatchEvent(new CustomEvent("llm-proxy-toggle", { detail: { enabled: next } }));
  };

  const checkHealth = useCallback(async () => {
    setChecking(true);
    try {
      const response = await fetch("/api/llm/health", { cache: "no-store" });
      const data = await response.json();
      setHealth({
        ok: Boolean(data.ok),
        status: data.status,
        error: data.error,
        proxyUrl: data.proxyUrl,
      });
    } catch (error) {
      setHealth({
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLastCheck(new Date().toLocaleTimeString());
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <div
      data-testid="llm-proxy-toggle"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        fontFamily: "monospace",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: enabled ? "#10b981" : "#6b7280",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 14px",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 700,
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>{enabled ? "🤖" : "💤"}</span>
        Free LLM {enabled ? "ON" : "OFF"}
        <span style={{ fontSize: 10, opacity: 0.7 }}>▲</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 0,
            background: "#1e1e2e",
            border: "1px solid #3b3b5c",
            borderRadius: 10,
            padding: 16,
            minWidth: 280,
            boxShadow: "0 4px 24px rgba(0,0,0,.4)",
            color: "#cdd6f4",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <strong style={{ fontSize: 13 }}>Free LLM Proxy</strong>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" checked={enabled} onChange={toggle} />
              <span style={{ fontSize: 12, color: enabled ? "#a6e3a1" : "#f38ba8" }}>
                {enabled ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          <div style={{ fontSize: 11, color: "#6c7086", marginBottom: 8 }}>
            Proxy: {health.proxyUrl ?? "configured server‑side"}
          </div>

          <div style={{ fontSize: 12, padding: "6px 0" }}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  health.ok === null ? "#f9e2af" : health.ok ? "#a6e3a1" : "#f38ba8",
                marginRight: 6,
              }}
            />
            Proxy health: {health.ok === null ? "unknown" : health.ok ? "online" : "offline"}
            {typeof health.status === "number" ? ` (${health.status})` : ""}
          </div>

          {health.error && (
            <div style={{ fontSize: 10, color: "#f38ba8", marginTop: 6 }}>{health.error}</div>
          )}

          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button
              onClick={checkHealth}
              disabled={checking}
              style={{
                flex: 1,
                background: "#313244",
                color: "#cdd6f4",
                border: "none",
                borderRadius: 6,
                padding: "5px 10px",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              {checking ? "Checking..." : "Recheck"}
            </button>
            {lastCheck && (
              <span style={{ fontSize: 10, color: "#6c7086", alignSelf: "center" }}>{lastCheck}</span>
            )}
          </div>

          <div
            style={{
              marginTop: 10,
              padding: "6px 8px",
              background: "#181825",
              borderRadius: 6,
              fontSize: 10,
              color: "#6c7086",
            }}
          >
            <div>fast/code → Groq via proxy</div>
            <div>balanced → Mistral via proxy</div>
            <div>reasoning → OpenRouter via proxy</div>
            <div>long‑context/vision → Gemini direct server‑side</div>
            <div>github‑free → GitHub Models direct server‑side</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LLMProxyToggle;
