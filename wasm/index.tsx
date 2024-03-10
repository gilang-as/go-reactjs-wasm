import React, {useEffect} from "react";
import './wasm_exec.js';
import './wasm_types.d.js';

async function loadWasm(): Promise<void> {
  const goWasm = new window.Go();
  const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
  goWasm.run(result.instance);
}

declare global {
    interface Window {
        Add: (arg: number, arg2: number) => number;
    }
} 

const LoadWasm: React.FC<React.PropsWithChildren<NonNullable<unknown>>> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
      loadWasm().then(() => {
          setIsLoading(false);
      });
  }, []);

  if (isLoading) {
      return (
          <div className="wasm-loader-background h-screen">
              <div className="center-of-screen">
                  <h1>Loading</h1>
              </div>
          </div>
      );
  } else {
      return <React.Fragment>{props.children}</React.Fragment>;
  }
};

export default LoadWasm;