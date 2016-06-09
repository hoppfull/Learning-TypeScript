module App {
    export function run(canvas: HTMLCanvasElement) {
        const gl = <WebGLRenderingContext>(
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'))
        if (!gl) throw "Couldn't initialize WebGL!"

        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(1.0, 0.0, 0.0, 1.0)
        gl.enable(gl.CULL_FACE)
        gl.frontFace(gl.CCW)
        gl.cullFace(gl.BACK)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        const vshader = gl.createShader(gl.VERTEX_SHADER)
        const fshader = gl.createShader(gl.FRAGMENT_SHADER)

        gl.shaderSource(vshader, loadDoc('vs.glsl'))
        gl.shaderSource(fshader, loadDoc('fs.glsl'))

        gl.compileShader(vshader)
        gl.compileShader(fshader)

        if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS))
            throw "Vertex shader: " + gl.getShaderInfoLog(vshader)
        if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS))
            throw "Fragment shader: " + gl.getShaderInfoLog(fshader)

        const glProgram = gl.createProgram()

        gl.attachShader(glProgram, vshader)
        gl.attachShader(glProgram, fshader)

        gl.linkProgram(glProgram)

        if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS))
            throw "program: " + gl.getProgramInfoLog(glProgram)
        gl.validateProgram(glProgram)
        if (!gl.getProgramParameter(glProgram, gl.VALIDATE_STATUS))
            throw "program: " + gl.getProgramInfoLog(glProgram)


        gl.useProgram(glProgram)
        const posAttribute = gl.getAttribLocation(glProgram, 'pos')

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.5, 0.5,
            -0.5, 0.5,
            0.0, -0.5
        ]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(posAttribute)
        gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, 0, 0)

        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    function loadDoc(filename: string) {
        let text: string;
        const req = new XMLHttpRequest()
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 200)
                text = req.responseText
        }
        req.open('GET', filename, false)
        req.send()
        return text
    }
}
