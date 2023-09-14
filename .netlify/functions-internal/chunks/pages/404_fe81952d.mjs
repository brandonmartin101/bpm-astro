import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, m as maybeRenderHead, e as renderComponent, f as renderSlot } from '../astro_3995580b.mjs';
import 'html-escaper';
import 'clsx';
/* empty css                         *//* empty css                         *//* empty css                         */
const $$Astro$5 = createAstro("https://brandonmartin.dev");
const $$Helmet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Helmet;
  const { title } = Astro2.props;
  return renderTemplate`<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title><meta name="description" content="Brandon Martin is a web developer located just northwest of Milwaukee."><meta name="author" content="Brandon Martin"><meta name="keywords" content="brandon, martin, web developer, hartford wisconsin"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta property="og:title" content="Brandon Martin | Web Developer"><meta property="og:description" content="Brandon Martin is a web developer located just northwest of Milwaukee."><meta name="twitter:site" content="@toptal"><meta name="twitter:card" content="summary_large_image"><link rel="sitemap" href="/sitemap-index.xml">${renderHead()}</head>`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/components/Helmet.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$4 = createAstro("https://brandonmartin.dev");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  const logoSeed = Math.random() * Math.random();
  const logo = `//avatars.dicebear.com/api/pixel-art/${logoSeed}.svg?beard=variant01&beardProbability=100&hairProbability=0&accessoriesProbability=0&hatProbability=0&skinColor=variant02`;
  const miniGL = `https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js`;
  return renderTemplate(_a || (_a = __template(["", `<header class="header" data-astro-cid-3ef6ksr2><div class="logo-wrapper" data-astro-cid-3ef6ksr2><a href="/" class="nav-link" data-astro-cid-3ef6ksr2><!-- <div class='logo'>
				{avatar}
			</div> --><img class="logo"`, ' alt="Brandon Martin" data-astro-cid-3ef6ksr2><p class="white" data-astro-cid-3ef6ksr2>Brandon Martin</p></a></div><nav class="navigation" data-astro-cid-3ef6ksr2><ul data-astro-cid-3ef6ksr2><li data-astro-cid-3ef6ksr2><a href="/about" class="nav-link white" data-astro-cid-3ef6ksr2>/about</a></li><li data-astro-cid-3ef6ksr2><a href="/uses" class="nav-link white" data-astro-cid-3ef6ksr2>/uses</a></li><li data-astro-cid-3ef6ksr2><a href="/now" class="nav-link white" data-astro-cid-3ef6ksr2>/now</a></li></ul></nav><canvas class="background" data-astro-cid-3ef6ksr2></canvas><script', "><\/script><script>\n		const gradient = new Gradient();\n		gradient.initGradient('.background');\n	<\/script></header>"])), maybeRenderHead(), addAttribute(logo, "src"), addAttribute(miniGL, "src"));
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/components/Header.astro", void 0);

const $$Astro$3 = createAstro("https://brandonmartin.dev");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="footer"><button class="theme-switcher">Change Theme</button><span class="tools-attribution">Built with <a href="https://astro.build/" target="_blank" rel="noopener noreferrer">Astro</a></span><button class="night-switcher">Night Mode</button></footer>`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro("https://brandonmartin.dev");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">${renderComponent($$result, "Helmet", $$Helmet, { "title": `Brandon Martin | ${title}` })}${maybeRenderHead()}<body><div class="body-container">${renderComponent($$result, "Header", $$Header, {})}<main class="main">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</div></body></html>`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/layouts/PageLayout.astro", void 0);

const $$Astro$1 = createAstro("https://brandonmartin.dev");
const $$SitemapLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SitemapLinks;
  return renderTemplate`${maybeRenderHead()}<ul class="sitemap" data-astro-cid-earwhcqy><li data-astro-cid-earwhcqy><a href="/" data-astro-cid-earwhcqy>Home</a></li><li data-astro-cid-earwhcqy><a href="/about" data-astro-cid-earwhcqy>/About</a></li><li data-astro-cid-earwhcqy><a href="/uses" data-astro-cid-earwhcqy>/Uses</a></li><li data-astro-cid-earwhcqy><a href="/now" data-astro-cid-earwhcqy>/Now</a></li><li data-astro-cid-earwhcqy><a href="/misc" data-astro-cid-earwhcqy>/Misc</a></li><li data-astro-cid-earwhcqy><a href="/solera" data-astro-cid-earwhcqy>/Solera</a></li></ul>`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/components/SitemapLinks.astro", void 0);

const $$Astro = createAstro("https://brandonmartin.dev");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "404", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1 data-astro-cid-zetdm5md>404</h1><h2 class="h5" data-astro-cid-zetdm5md>You are lost. Looking for another page?</h2>${renderComponent($$result2, "SitemapLinks", $$SitemapLinks, { "data-astro-cid-zetdm5md": true })}` })}`;
}, "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/404.astro", void 0);

const $$file = "C:/Users/BMartin/Documents/GitHub/bpm-astro/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$PageLayout as $, _404 as _, $$SitemapLinks as a };
