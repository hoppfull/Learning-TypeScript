import { createStore } from 'redux'

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
        const store = createStore(myReducer)

        console.log(store.getState().i) // console: 0

        store.dispatch({ type: "INCREMENT" })

        console.log(store.getState().i) // console: 1

        store.dispatch({ type: "INCREMENT" })
        store.dispatch({ type: "INCREMENT" })

        console.log(store.getState().i) // console: 3

        const unsubscribe = store.subscribe(() => console.log("Something happened!"))

        store.dispatch({ type: "DECREMENT" }) // console: Something happened!
        store.dispatch({ type: "DECREMENT" }) // console: Something happened!
        store.dispatch({ type: "DECREMENT" }) // console: Something happened!
        store.dispatch({ type: "DECREMENT" }) // console: Something happened!

        console.log(store.getState().i) // console: -1

        unsubscribe()

        store.dispatch({ type: "INCREMENT" })
        store.dispatch({ type: "DECREMENT" })
        store.dispatch({ type: "DECREMENT" })

        console.log(store.getState().i) // console: -3
    }
}
