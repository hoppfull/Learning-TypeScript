class Shader {
    constructor(gl, _program, attribs) {
        this.gl = gl;
        this._program = _program;
        this._attribs = [];
        this.rowSize = 0;
        this._attribs = attribs.map(attrib => ({
            id: gl.getAttribLocation(_program, attrib.name),
            size: attrib.size
        }));
        this.rowSize = attribs.reduce((acc, attrib) => acc + attrib.size, 0);
    }
    get program() {
        return this._program;
    }
    render() {
        this.gl.useProgram(this._program);
        let stride = 0;
        this._attribs.forEach((attrib, i) => {
            this.gl.enableVertexAttribArray(attrib.id);
            this.gl.vertexAttribPointer(attrib.id, attrib.size, this.gl.FLOAT, false, this.rowSize * 4, stride * 4);
            stride += attrib.size;
        });
    }
    clean() {
        this._attribs.forEach(attrib => { this.gl.disableVertexAttribArray(attrib.id); });
        this.gl.useProgram(null);
    }
}
