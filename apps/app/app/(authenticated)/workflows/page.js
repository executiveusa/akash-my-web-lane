"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkflowsPage;
const workflows = [
    { title: "Dental Clinic Standard", description: "Fast migration + appointment CTA + local SEO schema.", market: "India" },
    { title: "Restaurant Package", description: "Menu-first layout + WhatsApp order button + mobile speed profile.", market: "Mexico" },
    { title: "Law Firm Authority", description: "Practice pages + lead forms + trust and review modules.", market: "US" },
];
function WorkflowsPage() {
    return (<div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Workflow Library</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workflows.map((workflow) => (<article className="rounded-xl border bg-card p-4" key={workflow.title}>
            <p className="text-muted-foreground text-xs uppercase">{workflow.market}</p>
            <h2 className="mt-1 font-semibold text-lg">{workflow.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{workflow.description}</p>
            <div className="mt-4 flex gap-2 text-sm">
              <button className="rounded border px-3 py-1" type="button">Copy</button>
              <button className="rounded border px-3 py-1" type="button">Share</button>
              <button className="rounded border px-3 py-1" type="button">Clone</button>
            </div>
          </article>))}
      </div>
    </div>);
}
