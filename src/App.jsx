import { useState } from 'react'
import { CSSTransition } from 'react-transition-group';

import Nav from './Nav'
import Card from './Card'
import Dropdown from './Dropdown'
import MenuButton from './MenuButton'
import gemStudio from './assets/L1430117.jpeg'


function App() {
  return (
    <div className='webpage'>
      <Navbar>
        <NavItem button="Menu">
          <DropdownMenu />
        </NavItem>
      </Navbar>
      <div className='cards'>
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
      </div>
    </div>
  )
}

function Navbar(props) {
  return(
    <nav className='navbar'>
      <div className='navbar-nav'> 
        <p><span className='black-text'>Lily Ballif</span> is a photographer based in Utah, USA.</p>
        {props.children} 
      </div>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return(
    <>
      <a href="#" className='nav-button' onClick={() => setOpen(!open)}>
        {props.button}
      </a>

      {open && props.children}
    </>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');

  function DropdownItem(props) {
    return(
      <li>
        <a href="#" className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          {props.children}
        </a>
      </li>
    );
  }

  return(
    <div className='dropdown'>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit classNames='menu-primary'>
        <div className="menu">
          <ul>
            <DropdownItem>Portraits</DropdownItem>
            <DropdownItem goToMenu='projects'>Projects</DropdownItem>
            <DropdownItem>Documentation</DropdownItem>
          </ul>
          
          <ul className='socials'>
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
      </CSSTransition>

      <CSSTransition in={activeMenu === 'projects'} unmountOnExit classNames='menu-secondary'>
        <div className="menu">
          <ul>
            <DropdownItem>Portraits</DropdownItem>
            <DropdownItem>
              Projects
              <ul className='sub-projects'>
                <DropdownItem>The Sound of Liver</DropdownItem>
                <DropdownItem>Feel Good</DropdownItem>
                <DropdownItem>A Star is Born</DropdownItem>
              </ul>
            </DropdownItem>
            <DropdownItem>Documentation</DropdownItem>
          </ul>
          
          <ul className='socials'>
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
      </CSSTransition>
    </div>
  );
}

export default App
