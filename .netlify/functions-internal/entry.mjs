import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_c102f796.mjs';
import 'react';
import 'react-dom/server';
import 'vue';
import 'vue/server-renderer';
import 'solid-js/web';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_3995580b.mjs';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_91a75d96.mjs');
const _page1  = () => import('./chunks/index_3480be47.mjs');
const _page2  = () => import('./chunks/sitemap_6684e507.mjs');
const _page3  = () => import('./chunks/solera_7160f9c6.mjs');
const _page4  = () => import('./chunks/misc_87898103.mjs');
const _page5  = () => import('./chunks/uses_919a7666.mjs');
const _page6  = () => import('./chunks/404_f35bab39.mjs');
const _page7  = () => import('./chunks/now_5a663c6f.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/sitemap.astro", _page2],["src/pages/solera.astro", _page3],["src/pages/misc.astro", _page4],["src/pages/uses.astro", _page5],["src/pages/404.astro", _page6],["src/pages/now.astro", _page7]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
