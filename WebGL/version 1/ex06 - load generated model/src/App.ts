module App {
    export function* run(): IterableIterator<Promise<any>> {
        const gl = Engine.context(<HTMLCanvasElement>document.getElementById('mainCanvas'))
        Engine.initScreen(gl)

        const xOffsetSlider = <HTMLInputElement>document.getElementById('xOffsetSlider')
        const yOffsetSlider = <HTMLInputElement>document.getElementById('yOffsetSlider')

        const flatshapeData = Ajax.loadJSON<modelData>('res/flatshape.json')

        const testVertSource = Ajax.loadText('res/TestVert.glsl')
        const testFragSource = Ajax.loadText('res/TestFrag.glsl')

        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource))
        const flatshapeModel = Engine.bufferModel(gl, yield flatshapeData)

        testShader.onrender = () => {
            gl.uniform1f(testShader.xOffsetUniform, xOffsetSlider.valueAsNumber)
            gl.uniform1f(testShader.yOffsetUniform, yOffsetSlider.valueAsNumber)
        }

        const renderScene = () => {
            Engine.clearScreen(gl)
            testShader.render(flatshapeModel)
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
