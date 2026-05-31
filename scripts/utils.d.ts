import { type ExecSyncOptions, exec as execRaw } from "node:child_process";
export declare const url = "https://github.com/vercel/next-forge";
export declare const cleanFileName: (file: string) => string;
export declare const execSyncOpts: ExecSyncOptions;
export declare const internalContentDirs: string[];
export declare const internalContentFiles: string[];
export declare const allInternalContent: string[];
export declare const semver: RegExp;
export declare const tempDirName = "next-forge-update";
export declare const exec: typeof execRaw.__promisify__;
export declare const supportedPackageManagers: string[];
export declare const getAvailableVersions: () => Promise<string[]>;
//# sourceMappingURL=utils.d.ts.map