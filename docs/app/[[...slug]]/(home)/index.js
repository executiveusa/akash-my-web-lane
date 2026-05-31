"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_1 = require("./components/apps");
const cta_1 = require("./components/cta");
const features_1 = require("./components/features");
const footer_1 = require("./components/footer");
const hero_1 = require("./components/hero");
const open_source_1 = require("./components/open-source");
const review_1 = require("./components/review");
const social_1 = require("./components/social");
const Home = () => (<main className="container mx-auto divide-y border-x px-0">
    <hero_1.Hero />
    <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="sm:col-span-2">
        <review_1.Review />
      </div>
      <div className="sm:col-span-1">
        <open_source_1.OpenSource />
      </div>
    </div>
    <div className="h-8 bg-dashed"/>
    <apps_1.Apps />
    <features_1.Features />
    <social_1.Social />
    <cta_1.CallToAction />
    <footer_1.Footer />
  </main>);
exports.default = Home;
