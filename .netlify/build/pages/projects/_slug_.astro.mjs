import '../../chunks/page-ssr_BBxdrf2K.mjs';
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent, a as addAttribute, b as createAstro } from '../../chunks/astro/server_BWUtRcAH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { l as loadQuery, N as Navbar } from '../../chunks/Navbar_C72w4GUF.mjs';
/* empty css                                    */
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const query = `*[_type == "projects"] { slug { current } }`;
  const { data } = await loadQuery({ query });
  return data.map((project) => ({
    params: { slug: project.slug.current }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const query = `*[_type == "projects" && slug.current == "${slug}"][0]{
  title,
  projectImages[]{
    asset->{
      url
    }
  }
}`;
  const { data: project } = await loadQuery({ query });
  return renderTemplate`${maybeRenderHead()}<div class="h-screen overflow-hidden flex flex-col justify-between" data-astro-cid-ovxcmftc> <div data-astro-cid-ovxcmftc> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/calvin/workspace/github/lily/src/components/Navbar", "client:component-export": "default", "data-astro-cid-ovxcmftc": true })} </div> <div class="pl-[1rem] pb-[1rem]" data-astro-cid-ovxcmftc> ${project.projectImages && renderTemplate`<div class="flex overflow-scroll no-scroll-bar" data-astro-cid-ovxcmftc> ${project.projectImages.map((image) => renderTemplate`<img${addAttribute(image.asset.url, "src")} alt="Project image" class="h-[50vh] pr-[0.5rem]" data-astro-cid-ovxcmftc>`)} </div>`} <h1 data-astro-cid-ovxcmftc>${project.title}</h1> </div> </div> `;
}, "/home/calvin/workspace/github/lily/src/pages/projects/[slug].astro", void 0);

const $$file = "/home/calvin/workspace/github/lily/src/pages/projects/[slug].astro";
const $$url = "/projects/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
