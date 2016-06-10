class TestShader extends Shader {
    constructor(gl, program) {
        super(gl, program, [
            { name: 'pos', size: 3, stride: 0 }
        ]);
        this.xOffsetUniform = this.getUniformLocation('xOffset');
        this.yOffsetUniform = this.getUniformLocation('yOffset');
    }
}
