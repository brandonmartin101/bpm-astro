import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_579a1fd5.mjs';
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
const _page1  = () => import('./chunks/index_453babe3.mjs');
const _page2  = () => import('./chunks/sitemap_8f3d2418.mjs');
const _page3  = () => import('./chunks/solera_6e7f2047.mjs');
const _page4  = () => import('./chunks/about_cafbdabc.mjs');
const _page5  = () => import('./chunks/misc_52d87a01.mjs');
const _page6  = () => import('./chunks/uses_e378dfbd.mjs');
const _page7  = () => import('./chunks/404_69f161f8.mjs');
const _page8  = () => import('./chunks/now_8db11d73.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/sitemap.astro", _page2],["src/pages/solera.astro", _page3],["src/pages/about.astro", _page4],["src/pages/misc.astro", _page5],["src/pages/uses.astro", _page6],["src/pages/404.astro", _page7],["src/pages/now.astro", _page8]]);
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
