declare type modelData = {
    mesh: number[],
    indices: number[]
}

declare type modelBuffer = {
    VBO: WebGLBuffer,
    IBO: WebGLBuffer,
    nIndices: number
}

declare type attrib = {
    id: number,
    size: number,
    stride: number
}