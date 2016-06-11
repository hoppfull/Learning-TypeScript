class TestShader extends Shader {
    public xOffsetUniform = this.getUniformLocation('xOffset')
    public yOffsetUniform = this.getUniformLocation('yOffset')
    public mainTex = { id: 0, location: this.getUniformLocation('mainTex') }
    public secTex = { id: 1, location: this.getUniformLocation('secTex') }

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        super(gl, program, [
            { name: 'pos', size: 2, stride: 0 },
            { name: 'uv', size: 2, stride: 2 },
        ])
    }
}
