//go:build js && wasm

package function

import (
	"syscall/js"
)

func MathAdd() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		return args[0].Int() + args[1].Int()
	})
}
