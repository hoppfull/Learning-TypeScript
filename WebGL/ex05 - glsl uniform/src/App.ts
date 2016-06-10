module App {
    export function run(canvas: HTMLCanvasElement) {
        const gl = Engine.context(canvas)
        Engine.initScreen(gl)

        const xOffsetSlider = <HTMLInputElement>document.getElementById('xOffsetSlider')
        const yOffsetSlider = <HTMLInputElement>document.getElementById('yOffsetSlider')

        Async.start(function* () {
            const triangleData = Async.loadDoc('res/triangle.json')
            const squareData = Async.loadDoc('res/square.json')

            const testVertSource = Async.loadDoc('res/TestVert.glsl')
            const testFragSource = Async.loadDoc('res/TestFrag.glsl')

            const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource))
            const triangleModel = Engine.bufferModel(gl, <modelData>JSON.parse(yield triangleData))
            const squareModel = Engine.bufferModel(gl, <modelData>JSON.parse(yield squareData))

            testShader.onrender = () => {
                gl.uniform1f(testShader.xOffsetUniform, xOffsetSlider.valueAsNumber)
                gl.uniform1f(testShader.yOffsetUniform, yOffsetSlider.valueAsNumber)
            }

            const renderScene = () => {
                Engine.clearScreen(gl)
                // testShader.render(triangleModel)
                testShader.render(squareModel)
            }
            renderScene()

            xOffsetSlider.oninput = e => {
                renderScene()
            }

            yOffsetSlider.oninput = e => {
                renderScene()
            }
        })
    }
}
