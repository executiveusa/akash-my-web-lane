"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const dynamic_1 = __importDefault(require("next/dynamic"));
const ReactPlayer = (0, dynamic_1.default)(() => import("react-player"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-black"/>,
});
const Video = ({ aspectRatio, ...props }) => (<div className="relative w-full" style={{ aspectRatio }}>
    <ReactPlayer {...props} height="100%" style={{
        position: "absolute",
    }} width="100%"/>
  </div>);
exports.Video = Video;
