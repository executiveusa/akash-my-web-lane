"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputOTP = InputOTP;
exports.InputOTPGroup = InputOTPGroup;
exports.InputOTPSlot = InputOTPSlot;
exports.InputOTPSeparator = InputOTPSeparator;
const input_otp_1 = require("input-otp");
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
function InputOTP({ className, containerClassName, ...props }) {
    return (<input_otp_1.OTPInput className={(0, utils_1.cn)("disabled:cursor-not-allowed", className)} containerClassName={(0, utils_1.cn)("flex items-center gap-2 has-disabled:opacity-50", containerClassName)} data-slot="input-otp" {...props}/>);
}
function InputOTPGroup({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex items-center", className)} data-slot="input-otp-group" {...props}/>);
}
function InputOTPSlot({ index, className, ...props }) {
    const inputOTPContext = React.useContext(input_otp_1.OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
    return (<div className={(0, utils_1.cn)("relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40", className)} data-active={isActive} data-slot="input-otp-slot" {...props}>
      {char}
      {hasFakeCaret && (<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000"/>
        </div>)}
    </div>);
}
function InputOTPSeparator({ ...props }) {
    return (<div data-slot="input-otp-separator" role="separator" {...props}>
      <lucide_react_1.MinusIcon />
    </div>);
}
