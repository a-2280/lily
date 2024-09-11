import { useState } from 'react'

import Navbar from './Navbar'
import Card from './Card'
import Carousel from './Carousel'

import gemStudio from './assets/L1430117.jpeg'



function App() {
  const [openCarousel, setOpenCarousel] = useState(false);

  return (
    <div className='webpage'>
      <Navbar />
      {openCarousel && <Carousel onClose={() => setOpenCarousel(false)} />}
      <div className='cards'>
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" onClick={() => setOpenCarousel(!openCarousel)} />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
        <Card src={gemStudio} alt="Gem Studio" p="Gem Studio" />
      </div>
    </div>
  )
}
export default App