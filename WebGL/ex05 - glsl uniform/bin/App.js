var App;
(function (App) {
    function run(canvas) {
        const gl = Engine.context(canvas);
        Engine.initScreen(gl);
        const xOffsetSlider = document.getElementById('xOffsetSlider');
        const yOffsetSlider = document.getElementById('yOffsetSlider');
        Async.start(function* () {
            const triangleData = Async.loadDoc('res/triangle.json');
            const squareData = Async.loadDoc('res/square.json');
            const testVertSource = Async.loadDoc('res/TestVert.glsl');
            const testFragSource = Async.loadDoc('res/TestFrag.glsl');
            const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource));
            const triangleModel = Engine.bufferModel(gl, JSON.parse(yield triangleData));
            const squareModel = Engine.bufferModel(gl, JSON.parse(yield squareData));
            testShader.onrender = () => {
                gl.uniform1f(testShader.xOffsetUniform, xOffsetSlider.valueAsNumber);
                gl.uniform1f(testShader.yOffsetUniform, yOffsetSlider.valueAsNumber);
            };
            const renderScene = () => {
                Engine.clearScreen(gl);
                // testShader.render(triangleModel)
                testShader.render(squareModel);
            };
            renderScene();
            xOffsetSlider.oninput = e => {
                renderScene();
            };
            yOffsetSlider.oninput = e => {
                renderScene();
            };
        });
    }
    App.run = run;
})(App || (App = {}));
