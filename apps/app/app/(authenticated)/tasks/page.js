"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TasksPage;
const database_1 = require("@repo/database");
const server_1 = require("@repo/auth/server");
async function TasksPage() {
    const { userId } = await (0, server_1.auth)();
    if (!userId) {
        return <div>Unauthorized</div>;
    }
    const tasks = await database_1.database.operationTask.findMany({
        where: {
            orgId: { in: [userId, "system"] },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (<div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Operation Tasks</h1>
      <p className="text-muted-foreground">Manual review and recovery tasks for your migrations.</p>
      
      <div className="rounded-xl border bg-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="p-4">Priority</th>
              <th className="p-4">Type</th>
              <th className="p-4">Related ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (<tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">No tasks found.</td>
              </tr>) : (tasks.map((task) => (<tr key={task.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${task.priority === "critical" ? "bg-red-100 text-red-800" :
                task.priority === "high" ? "bg-orange-100 text-orange-800" :
                    "bg-blue-100 text-blue-800"}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{task.type.replace(/_/g, " ")}</td>
                  <td className="p-4 text-muted-foreground font-mono text-xs">{task.relatedId}</td>
                  <td className="p-4">
                    <span className="capitalize">{task.status.replace(/_/g, " ")}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                </tr>)))}
          </tbody>
        </table>
      </div>
    </div>);
}
