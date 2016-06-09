module App {
    export function run(canvas: HTMLCanvasElement) {
        const gl = Engine.context(canvas)
        Engine.initGl(gl)

        Async.start(function* () {
            const triangleSource: Promise<string> = Async.loadDoc('res/triangle.json')
            const squareSource: Promise<string> = Async.loadDoc('res/square.json')

            const shaderSource: shader = JSON.parse(yield Async.loadDoc('res/shader.json'))
            const vertSource: Promise<string> = Async.loadDoc('res/' + shaderSource.vs)
            const fragSource: Promise<string> = Async.loadDoc('res/' + shaderSource.fs)

            const shader = new Shader(gl,
                Engine.createShaderProgram(gl, yield vertSource, yield fragSource),
                shaderSource.attributes)

            const triangleRenderer = Engine.createModelRenderer(gl, <model>JSON.parse(yield triangleSource))
            const squareRenderer = Engine.createModelRenderer(gl, <model>JSON.parse(yield squareSource))

            Engine.clear(gl)
            triangleRenderer(shader)
            squareRenderer(shader)
        })
    }
}
