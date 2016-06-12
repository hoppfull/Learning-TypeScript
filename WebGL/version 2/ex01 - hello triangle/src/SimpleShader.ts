class SimpleShader extends ShaderData {
    constructor(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
        super(gl, vsSource, fsSource, [
            { name: 'position', size: 2, stride: 0 }
        ])
    }
}