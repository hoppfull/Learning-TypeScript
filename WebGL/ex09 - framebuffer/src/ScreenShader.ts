class ScreenShader extends Shader {
    public texture = { id: 0, location: this.getUniformLocation('texture') }
    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        super(gl, program, [
            { name: 'pos', size: 2, stride: 0 },
            { name: 'uv', size: 2, stride: 2 },
        ])
    }
}
