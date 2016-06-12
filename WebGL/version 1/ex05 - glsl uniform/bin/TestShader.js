class TestShader extends Shader {
    constructor(gl, program) {
        super(gl, program, [
            { name: 'uv', size: 2, stride: 2 },
            { name: 'pos', size: 2, stride: 0 }
        ]);
        this.xOffsetUniform = this.getUniformLocation('xOffset');
        this.yOffsetUniform = this.getUniformLocation('yOffset');
    }
}
