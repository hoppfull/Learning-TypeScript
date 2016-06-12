class TestShader extends Shader {
    constructor(gl, program) {
        super(gl, program, [
            { name: 'pos', size: 2, stride: 0 },
            { name: 'uv', size: 2, stride: 2 },
        ]);
        this.xOffsetUniform = this.getUniformLocation('xOffset');
        this.yOffsetUniform = this.getUniformLocation('yOffset');
        this.mainTex = { id: 0, location: this.getUniformLocation('mainTex') };
        this.secTex = { id: 1, location: this.getUniformLocation('secTex') };
    }
}
