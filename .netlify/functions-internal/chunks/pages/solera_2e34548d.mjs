import { c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_3995580b.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$PageLayout } from './404_fe81952d.mjs';
/* empty css                         *//* empty css                         *//* empty css                         */
const $$Astro = createAstro("https://brandonmartin.dev");
const $$Solera = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Solera;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Solera" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1>Solera Playground</h1><p>Tinker page for Solera work.</p>` })}`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/solera.astro", void 0);

const $$file = "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/solera.astro";
const $$url = "/solera";

export { $$Solera as default, $$file as file, $$url as url };
