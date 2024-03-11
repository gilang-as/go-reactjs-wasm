import React, { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import wasmLogo from '@/assets/wasm.svg'
import goLogo from '@/assets/go.svg'
import viteLogo from '/vite.svg'
import LoadWasm from "../../wasm";

const HomePage: React.FC = () => {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount(window.Add(count, 5))
  }

  return (
    <LoadWasm>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://webassembly.org" target="_blank">
          <img src={wasmLogo} className="logo wasm" alt="WebAssembly logo" />
        </a>
        <a href="https://go.dev" target="_blank">
          <img src={goLogo} className="logo go" alt="Go logo" />
        </a>
      </div>
      <h1>Vite + React + WebAssembly + Go</h1>
      <div className="card">
        <button onClick={onClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
          Source Code on <a href="https://github.com/gilang-as/go-reactjs-wasm" target="_blank">GitHub</a>
      </p>
    </LoadWasm>
  )
}

export default HomePage;
