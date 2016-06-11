class TestShader extends Shader {
    constructor(gl, program) {
        super(gl, program, [
            { name: 'pos', size: 2, stride: 0 },
            { name: 'uv', size: 2, stride: 2 },
        ]);
        this.ModelMatrixUniform = this.getUniformLocation('ModelMatrix');
        this.ViewMatrixUniform = this.getUniformLocation('ViewMatrix');
        this.ProjectionMatrixUniform = this.getUniformLocation('ProjectionMatrix');
        this.tex = { id: 0, location: this.getUniformLocation('tex') };
    }
}
