export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';
import 'vue';
import 'vue/server-renderer';
import 'solid-js/web';

const page = () => import('./pages/about_fc23d11c.mjs');

export { page };
