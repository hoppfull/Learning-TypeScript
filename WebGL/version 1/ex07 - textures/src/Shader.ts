abstract class Shader {
    private rowSize: number = 0
    private attribs: attrib[]
    constructor(protected gl: WebGLRenderingContext, protected program: WebGLProgram, attribs: { name: string, size: number, stride: number }[]) {
        this.attribs = attribs.map(({ name, size, stride }) => {
            this.rowSize += size
            return { id: gl.getAttribLocation(program, name), size, stride }
        })
    }

    protected getUniformLocation(name: string) {
        return this.gl.getUniformLocation(this.program, name)
    }

    private enableVertexArray({id, size, stride}: attrib) {
        this.gl.enableVertexAttribArray(id)
        this.gl.vertexAttribPointer(id, size, this.gl.FLOAT, false, this.rowSize * 4, stride * 4)
    }

    public onrender = () => { }

    public render({VBO, IBO, nIndices}: modelBuffer) {
        this.gl.useProgram(this.program)
        this.onrender()

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, VBO)
        this.attribs.forEach(attrib => this.enableVertexArray(attrib))

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, IBO)
        this.gl.drawElements(this.gl.TRIANGLES, nIndices, this.gl.UNSIGNED_SHORT, 0)

        this.attribs.forEach(attrib => this.gl.disableVertexAttribArray(attrib.id))
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
        this.gl.useProgram(null)
    }
}
