import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { g as decodeKey } from './chunks/astro/server_BWUtRcAH.mjs';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/calvin/workspace/github/lily/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/studio-route.uhnRrUP3.css"},{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/studio/[...params]","pattern":"^\\/studio(?:\\/(.*?))?\\/?$","segments":[[{"content":"studio","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/studio-route.uhnRrUP3.css"},{"type":"external","src":"/_astro/index.CVgYB1eT.css"},{"type":"inline","content":".no-scroll-bar[data-astro-cid-ovxcmftc]{scrollbar-width:none}.no-scroll-bar[data-astro-cid-ovxcmftc]::-webkit-scrollbar{display:none}\n"}],"routeData":{"route":"/projects/[slug]","isIndex":false,"type":"page","pattern":"^\\/projects\\/([^/]+?)\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/projects/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/studio-route.uhnRrUP3.css"},{"type":"external","src":"/_astro/index.CVgYB1eT.css"},{"type":"inline","content":".no-scroll-bar[data-astro-cid-j7pv25f6]{scrollbar-width:none}.no-scroll-bar[data-astro-cid-j7pv25f6]::-webkit-scrollbar{display:none}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/calvin/workspace/github/lily/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["/home/calvin/workspace/github/lily/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/studio/_---params_.astro.mjs","\u0000@astro-page:src/pages/projects/[slug]@_@astro":"pages/projects/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_RiElG-me.mjs","/home/calvin/workspace/github/lily/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/home/calvin/workspace/github/lily/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.E1qJPNIq.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/resources.mjs":"_astro/resources.i1O-hUTo.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/resources2.mjs":"_astro/resources2.CeyPSxSs.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.mjs":"_astro/ViteDevServerStopped.CUt4OHx7.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/resources3.mjs":"_astro/resources3.CgrYMG_4.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/index.mjs":"_astro/index.ChkHJJI9.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/index2.mjs":"_astro/index2.Dj6RcB0O.js","@astrojs/react/client.js":"_astro/client.Creo3yiD.js","/home/calvin/workspace/github/lily/node_modules/sanity/lib/_chunks-es/index3.mjs":"_astro/index3.Bkm8b6oG.js","/home/calvin/workspace/github/lily/src/components/Navbar":"_astro/Navbar.uyxEWNu9.js","/home/calvin/workspace/github/lily/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.Tf1Qze3-.js","/home/calvin/workspace/github/lily/src/components/Navbar.jsx":"_astro/Navbar.hFkcNexH.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CVgYB1eT.css","/_astro/studio-route.uhnRrUP3.css","/favicon.svg","/_astro/Navbar.hFkcNexH.js","/_astro/Navbar.uyxEWNu9.js","/_astro/ViteDevServerStopped.CUt4OHx7.js","/_astro/browser.7G0aVw9-.js","/_astro/client.Creo3yiD.js","/_astro/client.D2uXF50x.js","/_astro/index.ChkHJJI9.js","/_astro/index.RYns6xqu.js","/_astro/index.browser.BRY6MrRs.js","/_astro/index2.Dj6RcB0O.js","/_astro/index3.Bkm8b6oG.js","/_astro/resources.i1O-hUTo.js","/_astro/resources2.CeyPSxSs.js","/_astro/resources3.CgrYMG_4.js","/_astro/stegaEncodeSourceMap.E1qJPNIq.js","/_astro/studio-component.DVVQKg-7.js","/_astro/studio-component.Tf1Qze3-.js","/fonts/OTJubilee-Silver.woff","/fonts/OTJubilee-Silver.woff2"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"He02VHhH5nz5EA85U0kwmeT7RPocYuiQs8NMeAVz/ZQ=","experimentalEnvGetSecretEnabled":false});

export { manifest };
