var App;
(function (App) {
    function* run() {
        const gl = Engine.context(document.getElementById('mainCanvas'));
        Engine.initGl(gl);
        const triangleSource = Ajax.loadJSON('res/triangle.json');
        const squareSource = Ajax.loadJSON('res/square.json');
        const shaderSource = yield Ajax.loadJSON('res/shader.json');
        const vertSource = Ajax.loadText('res/' + shaderSource.vs);
        const fragSource = Ajax.loadText('res/' + shaderSource.fs);
        const shader = new Shader(gl, Engine.createShaderProgram(gl, yield vertSource, yield fragSource), shaderSource.attributes);
        const triangleRenderer = Engine.createModelRenderer(gl, yield triangleSource);
        const squareRenderer = Engine.createModelRenderer(gl, yield squareSource);
        Engine.clear(gl);
        triangleRenderer(shader);
        squareRenderer(shader);
    }
    App.run = run;
})(App || (App = {}));
