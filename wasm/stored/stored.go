package stored

import (
	"encoding/json"
	"errors"
	"github.com/google/uuid"
	cmap "github.com/orcaman/concurrent-map/v2"
	"syscall/js"
)

type Stored struct {
	Data cmap.ConcurrentMap[string, Data]
}

func New() *Stored {
	return &Stored{
		Data: cmap.New[Data](),
	}
}

func (w *Stored) AddData() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		text := args[0].String()
		key := uuid.New().String()
		w.Data.Set(key, Data{
			ID:   key,
			Text: text,
		})
		return nil
	})
}

func (w *Stored) GetData() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		results := w.Data.Items()
		if len(results) <= 0 {
			return []interface{}{}
		}

		jsonData, err := json.Marshal(results)
		if err != nil {
			return err
		}

		return string(jsonData)
	})
}

var (
	ErrorAddMessageNotExist = errors.New("message not exist")
)

func (w *Stored) DeleteData() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		key := args[0].String()
		if !w.Data.Has(key) {
			return ErrorAddMessageNotExist
		}
		w.Data.Remove(key)
		return nil
	})
}

func (w *Stored) UpdateData() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		key := args[0].String()
		text := args[1].String()
		if !w.Data.Has(key) {
			return ErrorAddMessageNotExist
		}
		w.Data.Set(key, Data{
			ID:   key,
			Text: text,
		})
		return nil
	})
}

func (w *Stored) GetDataByKey() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		key := args[0].String()
		data, ok := w.Data.Get(key)
		if !ok {
			return ErrorAddMessageNotExist
		}
		return data
	})
}
