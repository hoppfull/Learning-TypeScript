class ShaderData {
    constructor(gl, vsSource, fsSource, attributes) {
        this.program = WebGL.createShaderProgram(gl, vsSource, fsSource);
        this.rowSize = attributes.reduce((acc, { size }) => acc + size, 0);
        this.attributes = attributes.map(({ name, size, stride }) => ({ id: gl.getAttribLocation(this.program, name), size: size, stride: stride }));
    }
}
