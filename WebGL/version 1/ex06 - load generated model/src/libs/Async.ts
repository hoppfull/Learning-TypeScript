module Async {
    export function start(generator: () => IterableIterator<Promise<any>>) {
        const iterator = generator()
        const rec: (i: IteratorResult<Promise<any>>) => Promise<any> = i =>
            !i.done ? i.value.then(arg => rec(iterator.next(arg))) : i.value
        return rec(iterator.next())
    }
}
