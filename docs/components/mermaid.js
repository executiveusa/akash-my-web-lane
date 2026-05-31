"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mermaid = Mermaid;
const next_themes_1 = require("next-themes");
const react_1 = require("react");
function Mermaid({ chart }) {
    const id = (0, react_1.useId)();
    const [svg, setSvg] = (0, react_1.useState)("");
    const containerRef = (0, react_1.useRef)(null);
    const currentChartRef = (0, react_1.useRef)(null);
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (currentChartRef.current === chart || !container) {
            return;
        }
        currentChartRef.current = chart;
        async function renderChart() {
            const { default: mermaid } = await import("mermaid");
            try {
                mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: "loose",
                    fontFamily: "inherit",
                    themeCSS: "margin: 1.5rem auto 0;",
                    theme: resolvedTheme === "dark" ? "dark" : "default",
                });
                const { svg, bindFunctions } = await mermaid.render(id, chart.replaceAll("\\n", "\n"));
                bindFunctions?.(container);
                setSvg(svg);
            }
            catch (_error) { }
        }
        renderChart();
    }, [chart, id, resolvedTheme]);
    return <div dangerouslySetInnerHTML={{ __html: svg }} ref={containerRef}/>;
}
