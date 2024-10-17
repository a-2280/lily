import { useState, useEffect } from "react"
import { loadQuery } from "../sanity/lib/load-query"

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
        setMenuOpen(!menuOpen);
        if (menuOpen) {
            setProjectsOpen(false);
        }
    }

    return(
        <nav className="z-10 w-swh">
            <div className="flex justify-between px-[1rem] pt-[1rem]">
                <a href="/" className='secondary-color'>Lily Ballif</a>
                <button onClick={toggleMenu} className="text-[#808080]">{menuOpen ? 'Collapse' : 'Menu'}</button>
            </div>
            <div className="fixed w-full bg-white">
                <div className={`${menuOpen ? 'block' : 'hidden'} px-[1rem]`}>
                    <ul className="pt-[1rem]">
                        <li className="cursor-pointer w-max"><a>Portraits</a></li>
                        <li className="cursor-pointer w-max">
                            <a onClick={() => setProjectsOpen(!projectsOpen)}>Projects</a>
                            <ul className={projectsOpen ? 'block' : 'hidden'}>
                                {projects.map((project, index) => (
                                    <li key={index} className="cursor-pointer w-max pl-[2rem]">
                                        <a href={`/projects/${project.slug.current}`}>{project.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="cursor-pointer w-max"><a>Documentation</a></li>
                    </ul>
                    <ul className="pt-[1rem]">
                        <li className="cursor-pointer w-max"><a>About</a></li>
                        <li className="cursor-pointer w-max"><a>Email</a></li>
                        <li className="cursor-pointer w-max"><a>Instagram</a></li>
                    </ul>
                </div>
                <div className="bg-white h-[50px]"></div>
            </div>
        </nav>
    )
}