class ScreenShader extends Shader {
    constructor(gl, program) {
        super(gl, program, [
            { name: 'pos', size: 2, stride: 0 },
            { name: 'uv', size: 2, stride: 2 },
        ]);
        this.texture = { id: 0, location: this.getUniformLocation('texture') };
    }
}
