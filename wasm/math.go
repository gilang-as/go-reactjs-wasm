//go:build js && wasm

package wasm

import (
	"syscall/js"
)

func Add() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return args[0].Int() + args[1].Int()
	})
}
