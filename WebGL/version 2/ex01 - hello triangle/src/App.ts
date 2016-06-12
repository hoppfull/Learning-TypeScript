module App {
    export function* run() {
        const gl = WebGL.context(<HTMLCanvasElement>document.getElementById('mainCanvas'))

        const simpleShaderPromise = Async.start(function* () {
            const vsSource = Ajax.loadText('res/simple_vs.glsl')
            const fsSource = Ajax.loadText('res/simple_fs.glsl')
            return new SimpleShader(gl, yield vsSource, yield fsSource)
        })

        const triangleModelPromise = Async.start(function* () {
            const meshdata = Ajax.loadJSON('res/triangle.json')
            return WebGL.bufferModel(gl, yield meshdata)
        })

        WebGL.initContext(gl)
        WebGL.clearContext(gl)
        WebGL.drawWithShader(gl, yield simpleShaderPromise, yield triangleModelPromise, () => { })
    }
}