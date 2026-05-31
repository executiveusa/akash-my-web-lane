import type { ComponentProps } from "react";
type VideoProps = ComponentProps<typeof ReactPlayer> & {
    aspectRatio: string;
};
declare const ReactPlayer: any;
export declare const Video: ({ aspectRatio, ...props }: VideoProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=video.d.ts.map