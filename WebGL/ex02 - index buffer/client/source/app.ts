module App {
    function load(file: string): Promise<string> {
        return new Promise(resolve => {
            const request = new XMLHttpRequest()
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200)
                    resolve(request.responseText)
            }
            request.open('GET', file)
            request.send()
        })
    }

    const vShaderSource = load('vs.glsl')
    const fShaderSource = load('fs.glsl')

    export async function main() {
        const myCanvas = <HTMLCanvasElement>document.getElementById('myCanvas')
        const gl = myCanvas.getContext('webgl') || myCanvas.getContext('experimental-webgl')
        if (!gl) throw "Could not retrieve WebGL context! Your browser may not support it! :("

        gl.viewport(0, 0, myCanvas.width, myCanvas.height)
        gl.clearColor(0, 0, 1, 1)
        gl.enable(gl.CULL_FACE)
        gl.frontFace(gl.CCW)
        gl.cullFace(gl.BACK)

        const vShader = gl.createShader(gl.VERTEX_SHADER)
        const fShader = gl.createShader(gl.FRAGMENT_SHADER)

        gl.shaderSource(vShader, await vShaderSource)
        gl.shaderSource(fShader, await fShaderSource)

        gl.compileShader(vShader)
        gl.compileShader(fShader)

        if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS))
            throw `Vertex shader compilation error: ${gl.getShaderInfoLog(vShader)}`

        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS))
            throw `Fragment shader compilation error: ${gl.getShaderInfoLog(fShader)}`

        const shaderProgram = gl.createProgram()

        gl.attachShader(shaderProgram, vShader)
        gl.attachShader(shaderProgram, fShader)

        gl.linkProgram(shaderProgram)

        gl.detachShader(shaderProgram, vShader)
        gl.detachShader(shaderProgram, fShader)

        gl.deleteShader(vShader)
        gl.deleteShader(fShader)

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
            throw `Shader program linking error: ${gl.getProgramInfoLog(shaderProgram)}`

        gl.validateProgram(shaderProgram)
        if (!gl.getProgramParameter(shaderProgram, gl.VALIDATE_STATUS))
            throw `Shader program validation error: ${gl.getProgramInfoLog(shaderProgram)}`

        gl.useProgram(shaderProgram) // Select shader program
        const shaderProgram_posAttribute = gl.getAttribLocation(shaderProgram, 'pos')
        gl.useProgram(null) // Deselect shader program

        const squareMesh = new Float32Array([
            -1, 1, 0,
            -1, -1, 0,
            1, -1, 0,
            1, 1, 0
        ])

        const squareIndices = new Uint16Array([
            0, 1, 2,
            2, 3, 0
        ])

        const vbo = gl.createBuffer() // Create buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo) // Select buffer object
        // Store mesh on GPU:
        gl.bufferData(gl.ARRAY_BUFFER, squareMesh, gl.STATIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null) // Deselect buffer object

        const ibo = gl.createBuffer() // Create buffer object
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo) // Select buffer object
        // Store index data on GPU:
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, squareIndices, gl.STATIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null) // Deselect buffer object

        const render = (time?: number) => {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            try {
                gl.useProgram(shaderProgram)
                gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

                gl.enableVertexAttribArray(shaderProgram_posAttribute)
                gl.vertexAttribPointer(shaderProgram_posAttribute, 3, gl.FLOAT, false, 0, 0)

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
                gl.drawElements(gl.TRIANGLES, squareIndices.length, gl.UNSIGNED_SHORT, 0)
            } finally {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
                gl.bindBuffer(gl.ARRAY_BUFFER, null)
                gl.useProgram(null)
            }

            window.requestAnimationFrame(render)
        }

        render()
    }
}
