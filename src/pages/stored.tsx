import React, { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import wasmLogo from '@/assets/wasm.svg'
import goLogo from '@/assets/go.svg'
import viteLogo from '/vite.svg'
import LoadWasm from "../../wasm";

interface Data {
    id: string;
    created_at: string;
    text: string;
}
const StoredPage: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [text, setText] = useState("");

    const getData = () => {
        const results = window.GetData()
        setData(JSON.parse(results))
    }

    const onDelete = (id: string) => {
        window.DeleteData(id)
        getData()
    }

    useEffect(() => {
        getData()
    }, [])


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      if (text != "" ){
          window.AddData(text)
          getData()
      }
    }

    return (
        <>
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
                <div style={{ overflowX: "auto" }}>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="text-input"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <input className="button" type="submit"/>
                    </form>
                    <table style={{width: "100%"}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>Text</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.created_at}</td>
                                    <td>{data.text}</td>
                                    <td><button onClick={() => onDelete(data.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const Wrapper = () => {
    return (
        <LoadWasm>
            <StoredPage/>
        </LoadWasm>
    )
}

export default Wrapper;
