module App {
    export function* run(): IterableIterator<Promise<any>> {
        const gl = Engine.context(<HTMLCanvasElement>document.getElementById('mainCanvas'))
        Engine.initScreen(gl)

        const xOffsetSlider = <HTMLInputElement>document.getElementById('xOffsetSlider')
        const yOffsetSlider = <HTMLInputElement>document.getElementById('yOffsetSlider')

        const triangleData = Ajax.loadJSON<modelData>('res/triangle.json')
        const squareData = Ajax.loadJSON<modelData>('res/square.json')

        const testVertSource = Ajax.loadText('res/TestVert.glsl')
        const testFragSource = Ajax.loadText('res/TestFrag.glsl')

        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource))
        const triangleModel = Engine.bufferModel(gl, yield triangleData)
        const squareModel = Engine.bufferModel(gl, yield squareData)

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
    }
}
