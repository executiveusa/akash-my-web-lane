"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Demo = void 0;
const lucide_react_1 = require("lucide-react");
const video_1 = require("./video");
const Demo = () => (<section className="grid grid-cols-3" id="demo">
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <lucide_react_1.TerminalIcon size={14}/>
        <small>CLI Installation</small>
      </div>
      <h2 className="font-semibold text-4xl">
        Get from zero to production in minutes.
      </h2>
      <p className="text-muted-foreground">
        Getting started is as easy as running a single command.
      </p>
    </div>
    <div className="col-span-2">
      <video_1.Video aspectRatio="3440 / 2160" controls={false} loop muted playing src="https://youtu.be/4LRXL6l-FS4"/>
    </div>
  </section>);
exports.Demo = Demo;
