var App;
(function (App) {
    function* run() {
        const gl = Engine.context(document.getElementById('mainCanvas'));
        Engine.initScreen(gl);
        const xOffsetSlider = document.getElementById('xOffsetSlider');
        const yOffsetSlider = document.getElementById('yOffsetSlider');
        const triangleData = Ajax.loadJSON('res/triangle.json');
        const squareData = Ajax.loadJSON('res/square.json');
        const testVertSource = Ajax.loadText('res/TestVert.glsl');
        const testFragSource = Ajax.loadText('res/TestFrag.glsl');
        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource));
        const triangleModel = Engine.bufferModel(gl, yield triangleData);
        const squareModel = Engine.bufferModel(gl, yield squareData);
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
    }
    App.run = run;
})(App || (App = {}));
