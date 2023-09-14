import { c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_3995580b.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$SitemapLinks, $ as $$PageLayout } from './404_fe81952d.mjs';
/* empty css                             *//* empty css                         *//* empty css                         *//* empty css                         */
const $$Astro = createAstro("https://brandonmartin.dev");
const $$Sitemap = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sitemap;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Sitemap", "data-astro-cid-qob6xzsh": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1 data-astro-cid-qob6xzsh>Sitemap</h1><h2 class="h5" data-astro-cid-qob6xzsh>Just all the links on the site, in case you get lost.</h2>${renderComponent($$result2, "SitemapLinks", $$SitemapLinks, { "data-astro-cid-qob6xzsh": true })}` })}`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/sitemap.astro", void 0);

const $$file = "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/sitemap.astro";
const $$url = "/sitemap";

export { $$Sitemap as default, $$file as file, $$url as url };
