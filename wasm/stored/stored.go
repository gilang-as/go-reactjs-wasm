package stored

import (
	"encoding/json"
	"errors"
	"github.com/google/uuid"
	cmap "github.com/orcaman/concurrent-map/v2"
	"sort"
	"syscall/js"
	"time"
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
			ID:        key,
			CreatedAt: time.Now(),
			Text:      text,
		})
		return nil
	})
}

func (w *Stored) GetData() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		data := w.Data.Items()

		results := make([]Data, 0)
		for _, v := range data {
			results = append(results, v)
		}

		sort.Slice(results, func(i, j int) bool {
			return results[i].CreatedAt.After(results[j].CreatedAt)
		})

		jsonData, err := json.Marshal(results)
		if err != nil {
			return err
		}

		return js.ValueOf(string(jsonData))
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
