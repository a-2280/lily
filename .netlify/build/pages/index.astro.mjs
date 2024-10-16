import '../chunks/page-ssr_BBxdrf2K.mjs';
import { c as createComponent, r as renderTemplate, d as renderHead, f as renderSlot, b as createAstro, e as renderComponent, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_BWUtRcAH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { l as loadQuery, N as Navbar } from '../chunks/Navbar_C72w4GUF.mjs';
/* empty css                                 */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="flex flex-col h-[100svh] bg-red-400 justify-between"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/calvin/workspace/github/lily/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const query = `*[_type == "projects"]{
  title,
  "favoriteImages": projectImages[isFavorite == true].asset->url
}`;
  const { data: projects } = await loadQuery({ query });
  const favoriteImages = projects.flatMap(
    (project) => project.favoriteImages.map((url) => ({ title: project.title, url }))
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/calvin/workspace/github/lily/src/components/Navbar.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<div class="flex overflow-x-scroll no-scroll-bar pl-[1rem] pb-[1rem]" data-astro-cid-j7pv25f6> ${favoriteImages.map((image) => renderTemplate`<div class="flex-shrink-0" data-astro-cid-j7pv25f6> <img${addAttribute(image.url, "src")}${addAttribute(image.title, "alt")} class="h-[50vh] w-auto pr-[0.5rem]" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>${image.title}</p> </div>`)} </div> ` })} `;
}, "/home/calvin/workspace/github/lily/src/pages/index.astro", void 0);

const $$file = "/home/calvin/workspace/github/lily/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
