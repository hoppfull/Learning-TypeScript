import { render } from 'react-dom'
import * as React from 'react'
import { createStore, Store } from 'redux'

export module App {
    interface MyState {
        readonly i: number
    }

    type MyAction =
        { type: "@@redux/INIT" } |
        { type: "INCREMENT" } |
        { type: "DECREMENT" }

    function myReducer(state: MyState, action: MyAction): MyState {
        switch (action.type) {
            case "@@redux/INIT": return { i: 0 }
            case "INCREMENT": return { ...state, i: state.i + 1 }
            case "DECREMENT": return { ...state, i: state.i - 1 }
        }
    }

    export function main() {
        const MyCounter = ({ store }: { store: Store<MyState> }) =>
            <div>
                <h1>{store.getState().i}</h1>
                <button onClick={() => store.dispatch({ type: "INCREMENT" })} >+</button>
                <button onClick={() => store.dispatch({ type: "DECREMENT" })} >-</button>
            </div>

        const myStore = createStore(myReducer)

        const draw = () =>
            render(<MyCounter store={myStore} />, document.body)

        draw()

        myStore.subscribe(draw)
    }
}
