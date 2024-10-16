import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as sanityClient } from './page-ssr_BBxdrf2K.mjs';

async function loadQuery({
  query,
  params
}) {
  const { result } = await sanityClient.fetch(
    query,
    params ?? {},
    { filterResponse: false }
  );
  return {
    data: result
  };
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "projects"] { title, slug { current } }`;
      const { data } = await loadQuery({ query });
      setProjects(data);
    };
    fetchProjects();
  }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setProjectsOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("nav", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-[1rem]", children: [
      /* @__PURE__ */ jsx("a", { href: "/", className: "secondary-color", children: "Lily Ballif" }),
      /* @__PURE__ */ jsx("button", { onClick: toggleMenu, className: "text-[#808080]", children: "Menu" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${menuOpen ? "block" : "hidden"} px-[1rem]`, children: [
      /* @__PURE__ */ jsxs("ul", { className: "pt-[1rem]", children: [
        /* @__PURE__ */ jsx("li", { className: "cursor-pointer w-max", children: /* @__PURE__ */ jsx("a", { children: "Portraits" }) }),
        /* @__PURE__ */ jsxs("li", { className: "cursor-pointer w-max", children: [
          /* @__PURE__ */ jsx("a", { onClick: () => setProjectsOpen(!projectsOpen), children: "Projects" }),
          /* @__PURE__ */ jsx("ul", { className: projectsOpen ? "block" : "hidden", children: projects.map((project, index) => /* @__PURE__ */ jsx("li", { className: "cursor-pointer w-max pl-[2rem]", children: /* @__PURE__ */ jsx("a", { href: `/projects/${project.slug.current}`, children: project.title }) }, index)) })
        ] }),
        /* @__PURE__ */ jsx("li", { className: "cursor-pointer w-max", children: /* @__PURE__ */ jsx("a", { children: "Documentation" }) })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "pt-[1rem]", children: [
        /* @__PURE__ */ jsx("li", { className: "cursor-pointer w-max", children: /* @__PURE__ */ jsx("a", { children: "About" }) }),
        /* @__PURE__ */ jsx("li", { className: "cursor-pointer w-max", children: /* @__PURE__ */ jsx("a", { children: "Email" }) }),
        /* @__PURE__ */ jsx("li", { className: "cursor-pointer w-max", children: /* @__PURE__ */ jsx("a", { children: "Instagram" }) })
      ] })
    ] })
  ] });
}

export { Navbar as N, loadQuery as l };
