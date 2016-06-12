module Ajax {
    export const loadText = (source: string) =>
        ajax<string>(source, response => response)

    export const loadJSON = <T>(source: string) =>
        ajax<T>(source, JSON.parse)

    const ajax = <T>(source: string, callback: (r: string) => T) =>
        new Promise(resolve => {
            const req = new XMLHttpRequest()
            req.onreadystatechange = () =>
                req.readyState === 4 && req.status === 200
                    ? resolve(callback(req.responseText)) : null
            req.open('GET', source, true)
            req.send()
        })

    export const loadImage = (source: string) =>
        new Promise(resolve => {
            const image = new Image()
            image.onload = () => {
                resolve(image)
            }
            image.src = source
        })
}
