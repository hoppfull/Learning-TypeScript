class SimpleShader extends ShaderData {
    constructor(gl, vsSource, fsSource) {
        super(gl, vsSource, fsSource, [
            { name: 'position', size: 2, stride: 0 }
        ]);
    }
}
