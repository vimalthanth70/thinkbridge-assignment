import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </>
  )
}

export default App
