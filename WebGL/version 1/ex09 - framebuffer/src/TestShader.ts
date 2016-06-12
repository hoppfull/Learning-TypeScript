class TestShader extends Shader {
    public ModelMatrixUniform = this.getUniformLocation('ModelMatrix')
    public ViewMatrixUniform = this.getUniformLocation('ViewMatrix')
    public ProjectionMatrixUniform = this.getUniformLocation('ProjectionMatrix')
    public tex = { id: 0, location: this.getUniformLocation('tex') }

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        super(gl, program, [
            { name: 'pos', size: 2, stride: 0 },
            { name: 'uv', size: 2, stride: 2 },
        ])
    }
}
