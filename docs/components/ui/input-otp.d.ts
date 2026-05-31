import { OTPInput } from "input-otp";
import * as React from "react";
declare function InputOTP({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}): any;
declare function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">): any;
declare function InputOTPSlot({ index, className, ...props }: React.ComponentProps<"div"> & {
    index: number;
}): any;
declare function InputOTPSeparator({ ...props }: React.ComponentProps<"div">): any;
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
//# sourceMappingURL=input-otp.d.ts.map