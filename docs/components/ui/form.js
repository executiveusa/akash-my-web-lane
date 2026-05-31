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
exports.FormField = exports.Form = exports.useFormField = void 0;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormMessage = FormMessage;
const radix_ui_1 = require("radix-ui");
const React = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const label_1 = require("@/components/ui/label");
const utils_1 = require("@/lib/utils");
const Form = react_hook_form_1.FormProvider;
exports.Form = Form;
const FormFieldContext = React.createContext({});
const FormField = ({ ...props }) => (<FormFieldContext.Provider value={{ name: props.name }}>
    <react_hook_form_1.Controller {...props}/>
  </FormFieldContext.Provider>);
exports.FormField = FormField;
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState } = (0, react_hook_form_1.useFormContext)();
    const formState = (0, react_hook_form_1.useFormState)({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};
exports.useFormField = useFormField;
const FormItemContext = React.createContext({});
function FormItem({ className, ...props }) {
    const id = React.useId();
    return (<FormItemContext.Provider value={{ id }}>
      <div className={(0, utils_1.cn)("grid gap-2", className)} data-slot="form-item" {...props}/>
    </FormItemContext.Provider>);
}
function FormLabel({ className, ...props }) {
    const { error, formItemId } = useFormField();
    return (<label_1.Label className={(0, utils_1.cn)("data-[error=true]:text-destructive", className)} data-error={!!error} data-slot="form-label" htmlFor={formItemId} {...props}/>);
}
function FormControl({ ...props }) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (<radix_ui_1.Slot.Slot aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`} aria-invalid={!!error} data-slot="form-control" id={formItemId} {...props}/>);
}
function FormDescription({ className, ...props }) {
    const { formDescriptionId } = useFormField();
    return (<p className={(0, utils_1.cn)("text-muted-foreground text-sm", className)} data-slot="form-description" id={formDescriptionId} {...props}/>);
}
function FormMessage({ className, ...props }) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : props.children;
    if (!body) {
        return null;
    }
    return (<p className={(0, utils_1.cn)("text-destructive text-sm", className)} data-slot="form-message" id={formMessageId} {...props}>
      {body}
    </p>);
}
