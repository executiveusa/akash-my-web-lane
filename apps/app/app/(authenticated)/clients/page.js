"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientsPage;
const clients = [
    { name: "Sunrise Dental", industry: "Dental", lighthouse: 96, udec: 9.3, lastMigration: "2026-04-11", mrr: "$699", tier: "agency" },
    { name: "Rivera Law Group", industry: "Legal", lighthouse: 83, udec: 8.7, lastMigration: "2026-04-09", mrr: "$499", tier: "pro" },
    { name: "Bombay Bites", industry: "Restaurant", lighthouse: 67, udec: 7.9, lastMigration: "2026-04-08", mrr: "$299", tier: "free" },
];
const scoreClass = (score) => (score < 70 ? "text-red-500" : score < 90 ? "text-yellow-500" : "text-green-500");
function ClientsPage() {
    return (<div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Client Roster</h1>
      <div className="overflow-x-auto rounded-xl border bg-card p-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-2">Business</th><th>Industry</th><th>Lighthouse</th><th>UDEC</th><th>Last migration</th><th>Monthly revenue</th><th>AI tier</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (<tr className="border-b" key={client.name}>
                <td className="py-2">{client.name}</td><td>{client.industry}</td><td className={scoreClass(client.lighthouse)}>{client.lighthouse}</td><td>{client.udec}</td><td>{client.lastMigration}</td><td>{client.mrr}</td><td>{client.tier}</td>
                <td className="space-x-2"><button type="button">View</button><button type="button">Admin</button><button type="button">Re-migrate</button><button type="button">WhatsApp</button></td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
