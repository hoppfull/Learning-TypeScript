class TestShader extends Shader {
    public xOffsetUniform = this.getUniformLocation('xOffset')
    public yOffsetUniform = this.getUniformLocation('yOffset')

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        super(gl, program, [
            { name: 'pos', size: 3, stride: 0 }
        ])
    }
}
