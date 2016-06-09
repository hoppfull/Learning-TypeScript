class Shader {
    private _attribs: { id: number, size: number }[] = []
    private rowSize = 0;
    get program(): WebGLProgram {
        return this._program
    }

    constructor(private gl: WebGLRenderingContext, private _program: WebGLProgram, attribs: { name: string, size: number }[]) {
        this._attribs = attribs.map(attrib => ({
            id: gl.getAttribLocation(_program, attrib.name),
            size: attrib.size
        }))
        this.rowSize = attribs.reduce((acc, attrib) => acc + attrib.size, 0)
    }

    render() {
        this.gl.useProgram(this._program)
        let stride = 0
        this._attribs.forEach((attrib, i) => {
            this.gl.enableVertexAttribArray(attrib.id)
            this.gl.vertexAttribPointer(attrib.id, attrib.size, this.gl.FLOAT, false, this.rowSize * 4, stride * 4)
            stride += attrib.size
        })
    }

    clean() {
        this._attribs.forEach(attrib => { this.gl.disableVertexAttribArray(attrib.id) })
        this.gl.useProgram(null)
    }
}
