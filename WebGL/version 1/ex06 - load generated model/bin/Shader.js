class Shader {
    constructor(gl, program, attribs) {
        this.gl = gl;
        this.program = program;
        this.rowSize = 0;
        this.onrender = () => { };
        this.attribs = attribs.map(({ name, size, stride }) => {
            this.rowSize += size;
            return { id: gl.getAttribLocation(program, name), size: size, stride: stride };
        });
    }
    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }
    enableVertexArray({ id, size, stride }) {
        this.gl.enableVertexAttribArray(id);
        this.gl.vertexAttribPointer(id, size, this.gl.FLOAT, false, this.rowSize * 4, stride * 4);
    }
    render({ VBO, IBO, nIndices }) {
        this.gl.useProgram(this.program);
        this.onrender();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, VBO);
        this.attribs.forEach(attrib => this.enableVertexArray(attrib));
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, IBO);
        this.gl.drawElements(this.gl.TRIANGLES, nIndices, this.gl.UNSIGNED_SHORT, 0);
        this.attribs.forEach(attrib => this.gl.disableVertexAttribArray(attrib.id));
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.useProgram(null);
    }
}
