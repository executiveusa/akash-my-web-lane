"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetadata = void 0;
const server_1 = require("@repo/auth/server");
const database_1 = require("@repo/database");
const navigation_1 = require("next/navigation");
const header_1 = require("../components/header");
const generateMetadata = async ({ searchParams, }) => {
    const { q } = await searchParams;
    return {
        title: `${q} - Search results`,
        description: `Search results for ${q}`,
    };
};
exports.generateMetadata = generateMetadata;
const SearchPage = async ({ searchParams }) => {
    const { q } = await searchParams;
    const clients = await database_1.database.client.findMany({
        where: {
            businessName: {
                contains: q,
            },
        },
    });
    const { orgId } = await (0, server_1.auth)();
    if (!orgId) {
        (0, navigation_1.notFound)();
    }
    if (!q) {
        (0, navigation_1.redirect)("/");
    }
    return (<>
      <header_1.Header page="Search" pages={["Building Your Application"]}/>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {clients.map((client) => (<div className="aspect-video rounded-xl bg-muted/50 p-4" key={client.id}>
              {client.businessName}
            </div>))}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"/>
      </div>
    </>);
};
exports.default = SearchPage;
