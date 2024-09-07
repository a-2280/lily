import { useState } from 'react'
import Nav from './Nav'
import Card from './Card'
import gemStudio from './assets/L1430117.jpeg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='webpage'>
      <Nav />
      <div className='cards'>
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
