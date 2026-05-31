"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetadata = void 0;
const feature_flags_1 = require("@repo/feature-flags");
const internationalization_1 = require("@repo/internationalization");
const metadata_1 = require("@repo/seo/metadata");
const my_web_lane_1 = require("./components/my-web-lane");
const generateMetadata = async ({ params }) => {
    const { locale } = await params;
    const dictionary = await (0, internationalization_1.getDictionary)(locale);
    return (0, metadata_1.createMetadata)({
        title: "My Web Lane — Stop Losing to Slower Competitors",
        description: "We migrate slow WordPress sites to blazing-fast Astro + Cloudflare Pages — in 25 minutes.",
    });
};
exports.generateMetadata = generateMetadata;
const Home = async ({ params }) => {
    const { locale } = await params;
    const dictionary = await (0, internationalization_1.getDictionary)(locale);
    const betaFeature = await (0, feature_flags_1.showBetaFeature)();
    return (<>
      <my_web_lane_1.MyWebLaneLanding />
    </>);
};
exports.default = Home;
