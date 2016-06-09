var App;
(function (App) {
    function run(canvas) {
        const gl = Engine.context(canvas);
        Engine.initGl(gl);
        Async.start(function* () {
            const triangleSource = Async.loadDoc('res/triangle.json');
            const squareSource = Async.loadDoc('res/square.json');
            const shaderSource = JSON.parse(yield Async.loadDoc('res/shader.json'));
            const vertSource = Async.loadDoc('res/' + shaderSource.vs);
            const fragSource = Async.loadDoc('res/' + shaderSource.fs);
            const shader = new Shader(gl, Engine.createShaderProgram(gl, yield vertSource, yield fragSource), shaderSource.attributes);
            const triangleRenderer = Engine.createModelRenderer(gl, JSON.parse(yield triangleSource));
            const squareRenderer = Engine.createModelRenderer(gl, JSON.parse(yield squareSource));
            Engine.clear(gl);
            triangleRenderer(shader);
            squareRenderer(shader);
        });
    }
    App.run = run;
})(App || (App = {}));
