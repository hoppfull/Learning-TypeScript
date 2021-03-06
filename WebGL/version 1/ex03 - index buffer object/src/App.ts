module App {
    export function* run() {
        const gl = Engine.context(<HTMLCanvasElement>document.getElementById('mainCanvas'))
        Engine.initGl(gl)

        const vertSource = Ajax.loadText('res/vs.glsl')
        const fragSource = Ajax.loadText('res/fs.glsl')

        const triangleSource = Ajax.loadJSON('res/triangle.json')
        const squareSource = Ajax.loadJSON('res/square.json')

        const glProgram = Engine.createShaderProgram(gl, yield vertSource, yield fragSource)

        const posAttribute = gl.getAttribLocation(glProgram, 'pos')
        const vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
        const triangle = yield triangleSource
        const square = yield squareSource
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square.mesh), gl.STATIC_DRAW)

        const ibo = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(square.indices), gl.STATIC_DRAW)

        gl.useProgram(glProgram)
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
        gl.enableVertexAttribArray(posAttribute)
        gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, 0, 0)
        Engine.clear(gl)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
        gl.drawElements(gl.TRIANGLES, square.indices.length, gl.UNSIGNED_SHORT, 0)

    }
}
