import { useState, useEffect } from "react"
import { loadQuery } from "../sanity/lib/load-query"
import MenuBackground from "./MenuBackground";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [projectsOpen, setProjectsOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const query = `*[_type == "projects"] { title, slug { current } }`
            const { data } = await loadQuery({ query })
            setProjects(data)
        }
        fetchProjects()
    }, [])

    const toggleMenu = () => {
        const newMenuState = !menuOpen;
        setMenuOpen(newMenuState);
        if (menuOpen) {
            setProjectsOpen(false);
        }
        // Dispatch event for menu state change
        window.dispatchEvent(new CustomEvent('menuStateChanged', { 
            detail: { isOpen: newMenuState } 
        }));
    }

    return(
        <div>
            <nav className="z-10 w-swh">
                <div className="flex justify-between px-[20px] md:pt-[20px]">
                    <a href="/" className='secondary-color'>Lily Ballif<span className={menuOpen ? "hidden" : "hidden md:inline md:text-[#808080]"}> is a photographer based in Utah, USA. </span></a>
                    <button onClick={toggleMenu} className="text-[#808080]">{menuOpen ? 'Collapse' : 'Menu'}</button>
                </div>
                <div className="fixed w-full bg-white">
                    <div className={`${menuOpen ? 'block' : 'hidden'} px-[20px]`}>
                        <ul className="pt-[1rem]">
                            <li className="cursor-pointer w-max"><a href="/portraits" className="hover:text-black">Portraits</a></li>
                            <li className="cursor-pointer w-max">
                                <a onClick={() => setProjectsOpen(!projectsOpen)} className="hover:text-black">Projects</a>
                                <ul className={projectsOpen ? 'block' : 'hidden'}>
                                    {projects.map((project, index) => (
                                        <li key={index} className="cursor-pointer w-max pl-[2rem]">
                                            <a href={`/projects/${project.slug.current}`} className="hover:text-black">{project.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="cursor-pointer w-max"><a href="/documentation" className="hover:text-black">Documentation</a></li>
                            <li className="cursor-pointer w-max"><a href="/fashion" className="hover:text-black">Fashion</a></li>
                            <li className="cursor-pointer w-max"><a href="/random" className="hover:text-black">Random</a></li>
                        </ul>
                        <ul className="pt-[1rem]">
                            <li className="cursor-pointer w-max secondary-colo"><a href="/about" className="hover:text-black">About</a></li>
                            <li className="cursor-pointer w-max"><a href="mailto:lily@ballif.org" className="hover:text-black">Email</a></li>
                            <li className="cursor-pointer w-max"><a href={'https://www.instagram.com/lily.ballif'} target="_blank" className="hover:text-black">Instagram</a></li>
                        </ul>
                    </div>
                    <div className="bg-white h-[20px]"></div>
                </div>
            </nav>
            {menuOpen && (
                <MenuBackground />
            )}
        </div>
    )
}