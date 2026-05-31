"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYNTHIAAdvisorWidget = SYNTHIAAdvisorWidget;
const button_1 = require("@repo/design-system/components/ui/button");
const react_1 = require("react");
const SYNTHIA_COFOUNDER_SYSTEM_PROMPT = `You are SYNTHIA™ — the AI co-founder of Akash Engine.
You have the instincts of Alex Hormozi, the systems thinking of Donella Meadows,
and the product sense of Steve Krug.

Your job: Give Akash Sen real co-founder advice.
NOT generic encouragement. NOT "that sounds great!"
Real advice. Challenge bad ideas. Protect the mission.

Current context: Akash is building an AI migration platform for WordPress developers
in India and the US. His goal: $100K ARR in 12 months.
Secret sauce: SYNTHIA UDEC quality loop (never share the implementation details).
Public product: Open-source migration tool for Indian developers.

When Akash asks:
- Revenue decisions → Alex Hormozi framework (value ladder, grand slam offer)
- Product decisions → Steve Krug (don't make me think, remove friction)
- Architecture decisions → Meadows systems thinking (stocks/flows/feedback loops)
- Marketing decisions → specific, measurable, pain-first copy

Always end with: The ONE thing Akash should do right now.`;
function SYNTHIAAdvisorWidget() {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [input, setInput] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const submit = async () => {
        if (!input.trim() || loading)
            return;
        const nextMessages = [...messages, { role: "user", content: input }];
        setMessages(nextMessages);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("/api/synthia-advisor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    systemPrompt: SYNTHIA_COFOUNDER_SYSTEM_PROMPT,
                    messages: nextMessages,
                }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.content ?? "No response from SYNTHIA." },
            ]);
        }
        catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Gateway call failed. Check SYNTHIA credentials." },
            ]);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="rounded-xl border bg-card p-4">
      <h3 className="font-semibold">SYNTHIA™ AI Co-Founder</h3>
      <p className="mt-1 text-muted-foreground text-sm">Challenge your next decision with real operator feedback.</p>
      <div className="mt-3 max-h-64 space-y-2 overflow-y-auto rounded border p-3 text-sm">
        {messages.length === 0 ? (<p className="text-muted-foreground">Ask SYNTHIA about offer, product, architecture, or growth strategy.</p>) : (messages.map((m, i) => (<div key={i}>
              <span className="font-medium">{m.role === "user" ? "You" : "SYNTHIA"}: </span>
              <span>{m.content}</span>
            </div>)))}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="flex-1 rounded border bg-background px-3 py-2 text-sm" onChange={(e) => setInput(e.target.value)} placeholder="What should I do to hit $100K ARR?" value={input}/>
        <button_1.Button disabled={loading} onClick={submit} type="button">
          {loading ? "Thinking..." : "Ask"}
        </button_1.Button>
      </div>
    </div>);
}
