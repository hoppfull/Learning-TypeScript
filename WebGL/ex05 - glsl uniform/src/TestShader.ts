class TestShader extends Shader {
    public xOffsetUniform = this.getUniformLocation('xOffset')
    public yOffsetUniform = this.getUniformLocation('yOffset')

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        super(gl, program, [
            { name: 'uv', size: 2, stride: 2 },
            { name: 'pos', size: 2, stride: 0 }
        ])
    }
}
