import { useState } from 'react'

import Navbar from './Navbar'
import Card from './Card'
import gemStudio from './assets/L1430117.jpeg'


function App() {
  const [activeMenu, setActiveMenu] = useState('main-nav');

  return (
    <div className='webpage'>
      <Navbar />
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
export default App