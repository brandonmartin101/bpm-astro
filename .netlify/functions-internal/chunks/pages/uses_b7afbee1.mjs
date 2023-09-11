import { c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_3995580b.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$PageLayout } from './404_14d2af44.mjs';
/* empty css                         *//* empty css                         *//* empty css                         */
const $$Astro = createAstro("https://brandonmartin.dev");
const $$Uses = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Uses;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Uses" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1>Uses</h1><p>This page is just a small overview of the software/products I use on a daily/frequent basis.</p>` })}`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/uses.astro", void 0);

const $$file = "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/uses.astro";
const $$url = "/uses";

export { $$Uses as default, $$file as file, $$url as url };
