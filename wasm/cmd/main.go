//go:build js && wasm

package main

import (
	"github.com/gilang-as/go-reactjs-wasm/wasm"
	"syscall/js"
)

func main() {
	ch := make(chan struct{}, 0)
	js.Global().Set("Add", wasm.Add())
	<-ch
}
