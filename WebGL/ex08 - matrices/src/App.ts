module App {
    export function* run(): IterableIterator<Promise<any>> {
        const gl = Engine.context(<HTMLCanvasElement>document.getElementById('mainCanvas'))
        Engine.initScreen(gl)

        const xOffsetSlider = <HTMLInputElement>document.getElementById('xOffsetSlider')
        const yOffsetSlider = <HTMLInputElement>document.getElementById('yOffsetSlider')
        const zOffsetSlider = <HTMLInputElement>document.getElementById('zOffsetSlider')

        const webglImage = Ajax.loadImage('res/WebGL_Logo.png')
        const glesImage = Ajax.loadImage('res/OpenGL_ES_Logo.png')

        const squareData = Ajax.loadJSON<modelData>('res/square.json')

        const testVertSource = Ajax.loadText('res/TestVert.glsl')
        const testFragSource = Ajax.loadText('res/TestFrag.glsl')

        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource))
        const squareModel = Engine.bufferModel(gl, yield squareData)

        const webglTexture = Engine.bufferTexture(gl, yield webglImage)
        const glesTexture = Engine.bufferTexture(gl, yield glesImage)

        const OriginMatrix = mat4.create()
        const ModelMatrix = mat4.create()
        const ViewMatrix = mat4.lookAt(mat4.create(), [0.5, -2, 2], [0, 0, 0], [0, 0, 1])
        const ProjectionMatrix = mat4.perspective(mat4.create(), 1, gl.canvas.width / gl.canvas.height, 0.1, 5)

        testShader.onrender = () => {
            gl.uniformMatrix4fv(testShader.ModelMatrixUniform, false, <Float32Array>mat4.translate(ModelMatrix, OriginMatrix, [xOffsetSlider.valueAsNumber, yOffsetSlider.valueAsNumber, zOffsetSlider.valueAsNumber]))
            gl.uniformMatrix4fv(testShader.ViewMatrixUniform, false, <Float32Array>ViewMatrix)
            gl.uniformMatrix4fv(testShader.ProjectionMatrixUniform, false, <Float32Array>ProjectionMatrix)
            Engine.useTexture(gl, testShader.mainTex, webglTexture)
            Engine.useTexture(gl, testShader.secTex, glesTexture)
        }

        const renderScene = () => {
            Engine.clearScreen(gl)
            testShader.render(squareModel)
        }
        renderScene()

        xOffsetSlider.oninput = e => {
            renderScene()
        }

        yOffsetSlider.oninput = e => {
            renderScene()
        }

        zOffsetSlider.oninput = e => {
            renderScene()
        }
    }
}
