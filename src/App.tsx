import { useState } from 'react'
import fantasticImg from './assets/image.png'
import './App.css'
import { Weather } from './Weather.tsx'

function App() {
  // state related to the current button click count
  // we have the count itself, and a mutator function to change it
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <img src={fantasticImg} width={420} />
        {/*
          This is a standard HTML button, but we're adding our own click
          handler to it - recall how annoying this was to do in the plain HTML
          example
        */}
        <button
          type="button"
          className="counter"
          // every time the button is clicked, update the count to be one more
          // than what it is currently. Wouldn't it be more fun if it added
          // a random amount every time instead?
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>
      {/* Include a weather doodad - it is defined in Weather.tsx */}
      <Weather />
      <section id="spacer"></section>
    </>
  )
}

export default App
