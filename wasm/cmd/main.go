//go:build js && wasm

package main

import (
	"github.com/gilang-as/go-reactjs-wasm/wasm/function"
	"github.com/gilang-as/go-reactjs-wasm/wasm/stored"
	"syscall/js"
)

func main() {
	ch := make(chan struct{}, 0)
	js.Global().Set("Add", function.MathAdd())

	storedData := stored.New()
	js.Global().Set("AddData", storedData.AddData())
	js.Global().Set("GetData", storedData.GetData())
	js.Global().Set("DeleteData", storedData.DeleteData())
	js.Global().Set("UpdateData", storedData.UpdateData())
	js.Global().Set("GetDataByKey", storedData.GetDataByKey())
	<-ch
}
