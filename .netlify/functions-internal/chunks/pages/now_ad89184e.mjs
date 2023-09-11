import { c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_3995580b.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$PageLayout } from './404_14d2af44.mjs';
/* empty css                         *//* empty css                         *//* empty css                         *//* empty css                         */
const $$Astro = createAstro("https://brandonmartin.dev");
const $$Now = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Now;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Now", "data-astro-cid-lfnvi74r": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1 data-astro-cid-lfnvi74r>Now</h1><p data-astro-cid-lfnvi74r>A small summary of what I'm up to right now.</p>` })}`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/now.astro", void 0);

const $$file = "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/now.astro";
const $$url = "/now";

export { $$Now as default, $$file as file, $$url as url };
