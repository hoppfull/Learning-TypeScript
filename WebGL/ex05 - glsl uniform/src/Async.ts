module Async {
    export function start(generator: () => IterableIterator<Promise<any>>) {
        const iterator = generator()
        function rec(iteration: IteratorResult<Promise<any>>) {
            iteration.value.then(arg => {
                const nextIteration = iterator.next(arg)
                if (!nextIteration.done)
                    rec(nextIteration)
            })
        }
        rec(iterator.next())
    }

    export function loadDoc(filename: string): Promise<string> {
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
