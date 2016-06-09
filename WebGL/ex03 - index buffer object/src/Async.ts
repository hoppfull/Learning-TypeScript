module Async {
    export function start(generator: () => IterableIterator<Promise<{}>>) {
        const iterator = generator()
        function rec(iteration: IteratorResult<Promise<{}>>) {
            iteration.value.then(arg => {
                const nextIteration = iterator.next(arg)
                if (!nextIteration.done)
                    rec(nextIteration)
            })
        }
        rec(iterator.next())
    }

    export function loadDoc(filename: string) {
        return new Promise(resolve => {
            const req = new XMLHttpRequest()
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200)
                    resolve(req.responseText)
            }
            req.open('GET', filename, true)
            req.send()
        })
    }
}
