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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = Carousel;
exports.CarouselContent = CarouselContent;
exports.CarouselItem = CarouselItem;
exports.CarouselPrevious = CarouselPrevious;
exports.CarouselNext = CarouselNext;
const embla_carousel_react_1 = __importDefault(require("embla-carousel-react"));
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
const CarouselContext = React.createContext(null);
function useCarousel() {
    const context = React.useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}
function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) {
    const [carouselRef, api] = (0, embla_carousel_react_1.default)({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api) => {
        if (!api)
            return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback((event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
        }
    }, [scrollPrev, scrollNext]);
    React.useEffect(() => {
        if (!(api && setApi))
            return;
        setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
        if (!api)
            return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);
        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);
    return (<CarouselContext.Provider value={{
            carouselRef,
            api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
        }}>
      <div aria-roledescription="carousel" className={(0, utils_1.cn)("relative", className)} data-slot="carousel" onKeyDownCapture={handleKeyDown} role="region" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>);
}
function CarouselContent({ className, ...props }) {
    const { carouselRef, orientation } = useCarousel();
    return (<div className="overflow-hidden" data-slot="carousel-content" ref={carouselRef}>
      <div className={(0, utils_1.cn)("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props}/>
    </div>);
}
function CarouselItem({ className, ...props }) {
    const { orientation } = useCarousel();
    return (<div aria-roledescription="slide" className={(0, utils_1.cn)("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)} data-slot="carousel-item" role="group" {...props}/>);
}
function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (<button_1.Button className={(0, utils_1.cn)("absolute size-8 rounded-full", orientation === "horizontal"
            ? "-left-12 -translate-y-1/2 top-1/2"
            : "-top-12 -translate-x-1/2 left-1/2 rotate-90", className)} data-slot="carousel-previous" disabled={!canScrollPrev} onClick={scrollPrev} size={size} variant={variant} {...props}>
      <lucide_react_1.ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </button_1.Button>);
}
function CarouselNext({ className, variant = "outline", size = "icon", ...props }) {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (<button_1.Button className={(0, utils_1.cn)("absolute size-8 rounded-full", orientation === "horizontal"
            ? "-right-12 -translate-y-1/2 top-1/2"
            : "-bottom-12 -translate-x-1/2 left-1/2 rotate-90", className)} data-slot="carousel-next" disabled={!canScrollNext} onClick={scrollNext} size={size} variant={variant} {...props}>
      <lucide_react_1.ArrowRight />
      <span className="sr-only">Next slide</span>
    </button_1.Button>);
}
