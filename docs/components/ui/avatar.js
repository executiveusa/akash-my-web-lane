"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = Avatar;
exports.AvatarImage = AvatarImage;
exports.AvatarFallback = AvatarFallback;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Avatar({ className, ...props }) {
    return (<radix_ui_1.Avatar.Root className={(0, utils_1.cn)("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)} data-slot="avatar" {...props}/>);
}
function AvatarImage({ className, ...props }) {
    return (<radix_ui_1.Avatar.Image className={(0, utils_1.cn)("aspect-square size-full", className)} data-slot="avatar-image" {...props}/>);
}
function AvatarFallback({ className, ...props }) {
    return (<radix_ui_1.Avatar.Fallback className={(0, utils_1.cn)("flex size-full items-center justify-center rounded-full bg-muted", className)} data-slot="avatar-fallback" {...props}/>);
}
