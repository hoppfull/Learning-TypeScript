class ShaderData implements WebGL.IShaderData {
    public program: WebGLProgram
    public rowSize: number
    public attributes: WebGL.IAttribute[]
    constructor(gl: WebGLRenderingContext, vsSource: string, fsSource: string, attributes: { name: string, size: number, stride: number }[]) {
        this.program = WebGL.createShaderProgram(gl, vsSource, fsSource)
        this.rowSize = attributes.reduce((acc, {size}) => acc + size, 0)
        this.attributes = attributes.map(({name, size, stride}) => ({ id: gl.getAttribLocation(this.program, name), size, stride }))
    }
}