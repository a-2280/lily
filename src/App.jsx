import { useState } from 'react'

import Navbar from './Navbar'
import Card from './Card'
import Carousel from './Carousel'

import gemStudio from './assets/L1430117.jpeg'
import limewireTitle from './assets/limewire/limewireTitle.jpg'
import projectOneTitle from './assets/projectOne/projectOneTitle.jpg'
import projectTwoTitle from './assets/projectTwo/projectTwoTitle.jpg'
import thailandTitle from './assets/thailand/thailandTitle.jpg'
import mpwrTitle from './assets/mpwr/mpwrTitle.jpg'
import unnamedTitle from './assets/unnamed/unnamedTitle.jpg'
import unnamedTwoTitle from './assets/unnamedTwo/unnamedTwoTitle.jpg'



function App() {
  const [openCarousel, setOpenCarousel] = useState(false);

  return (
    <div className='webpage'>
      <Navbar />
      {openCarousel && <Carousel onClose={() => setOpenCarousel(false)} />}
      <div className='cards'>
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" onClick={() => setOpenCarousel(!openCarousel)} />
        <Card src={limewireTitle} alt="Limewire" p="Limewire" />
        <Card src={projectOneTitle} alt="Project 1" p="Project 1" />
        <Card src={projectTwoTitle} alt="Project 2" p="Project 2" />
        <Card src={thailandTitle} alt="Thailand" p="Thailand" />
        <Card src={mpwrTitle} alt="MPWR" p="MPWR" />
        <Card src={unnamedTitle} alt="Unnamed" p="Unnamed" />
        <Card src={unnamedTwoTitle} alt="Unnamed 2" p="Unnamed 2" />
      </div>
    </div>
  )
}
export default App