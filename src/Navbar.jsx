import { useState } from "react";
import { CSSTransition } from 'react-transition-group';


function Navbar() {
    const [open, setOpen] = useState(false);

    return(
      <nav className='navbar'>
        <div className='navbar-nav'> 
            <p>
                <span className="black-text">Lily Ballif</span>
                {!open && <span className="nav-normal-text"> is a photographer based in Utah, USA.</span>}
            </p>
            <a href="#" onClick={() => setOpen(!open)}>
                {open ? "Collapse" : "Menu"}
            </a>

            {open && <DropdownMenu />}

        </div>
      </nav>
    );
  }

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');

    function DropdownItem(props) {
        return(
            <li>
                <a href="#" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>{props.children}</a>
            </li>
        );
    }

    return(
        <>
            <div className="background">
                <p>Lily Ballif is a photographer based in Utah, USA.</p>
            </div>
            <div className="dropdown">
                <ul className="content">
                    <CSSTransition in={activeMenu === 'main'} unmountOnExit>
                        <div className="menu">
                            <DropdownItem>Portraits</DropdownItem>
                            <DropdownItem goToMenu='projects'>Projects</DropdownItem>
                            <DropdownItem>Documentation</DropdownItem>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={activeMenu === 'projects'} unmountOnExit>
                        <div className="menu">
                            <DropdownItem>Portraits</DropdownItem>
                            <DropdownItem goToMenu='main'>
                                Projects
                                <ul className="projects-ul">
                                    <DropdownItem>The Sound of Liver</DropdownItem>
                                    <DropdownItem>Feel Good</DropdownItem>
                                    <DropdownItem>A Star is Born</DropdownItem>
                                </ul>
                            </DropdownItem>
                            <DropdownItem>Documentation</DropdownItem>
                        </div>
                    </CSSTransition>
                </ul>
                <ul className="socials">
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Email</a>
                    </li>
                    <li>
                        <a href="#">Instagram</a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar