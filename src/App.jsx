import { useState } from 'react'
import Nav from './Nav'
import Card from './Card'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='webpage'>
      <Nav />
      <div className='cards'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default App
