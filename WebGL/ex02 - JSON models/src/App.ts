module App {
    export function run(canvas: HTMLCanvasElement) {
        const gl = Engine.context(canvas)
        Engine.initGl(gl)

        Async.start(function* () {
            const vertSource: Promise<string> = Async.loadDoc('res/vs.glsl')
            const fragSource: Promise<string> = Async.loadDoc('res/fs.glsl')
            const triangleSource: Promise<string> = Async.loadDoc('res/triangle.json')

            const glProgram = Engine.createShaderProgram(gl, yield vertSource, yield fragSource)

            const posAttribute = gl.getAttribLocation(glProgram, 'pos')
            const buffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            const triangle = (<model>JSON.parse(yield triangleSource))
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle.mesh), gl.STATIC_DRAW)

            gl.enableVertexAttribArray(posAttribute)
            gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, 0, 0)
            gl.useProgram(glProgram)
            Engine.clear(gl)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        })
    }
}
