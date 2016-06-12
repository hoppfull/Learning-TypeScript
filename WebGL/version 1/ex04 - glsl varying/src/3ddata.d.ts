declare type model = {
    mesh: number[],
    indices: number[]
}

declare type shader = {
    vs: string,
    fs: string,
    attributes: { name: string, size: number }[]
}
