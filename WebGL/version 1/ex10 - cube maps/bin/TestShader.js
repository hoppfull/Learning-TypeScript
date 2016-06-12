class TestShader extends Shader {
    constructor(gl, program) {
        super(gl, program, [
            { name: 'pos', size: 3, stride: 0 },
            { name: 'norm', size: 3, stride: 3 },
        ]);
        this.ModelMatrixUniform = this.getUniformLocation('ModelMatrix');
        this.ViewMatrixUniform = this.getUniformLocation('ViewMatrix');
        this.ProjectionMatrixUniform = this.getUniformLocation('ProjectionMatrix');
        this.map = { id: 0, location: this.getUniformLocation('map') };
    }
}
