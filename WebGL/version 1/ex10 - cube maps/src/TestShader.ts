class TestShader extends Shader {
    public ModelMatrixUniform = this.getUniformLocation('ModelMatrix')
    public ViewMatrixUniform = this.getUniformLocation('ViewMatrix')
    public ProjectionMatrixUniform = this.getUniformLocation('ProjectionMatrix')
    public map = { id: 0, location: this.getUniformLocation('map') }

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        super(gl, program, [
            { name: 'pos', size: 3, stride: 0 },
            { name: 'norm', size: 3, stride: 3 },
        ])
    }
}
