module Ajax {
    export const loadText = (filename: string) =>
        ajax<string>(filename, response => response)

    export const loadJSON = <T>(filename: string) =>
        ajax<T>(filename, JSON.parse)

    const ajax = <T>(filename: string, callback: (r: string) => T) =>
        new Promise(resolve => {
            const req = new XMLHttpRequest()
            req.onreadystatechange = () =>
                req.readyState === 4 && req.status === 200
                    ? resolve(callback(req.responseText)) : null
            req.open('GET', filename, true)
            req.send()
        })
}
