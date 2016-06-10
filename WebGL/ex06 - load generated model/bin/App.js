var App;
(function (App) {
    function* run() {
        const gl = Engine.context(document.getElementById('mainCanvas'));
        Engine.initScreen(gl);
        const xOffsetSlider = document.getElementById('xOffsetSlider');
        const yOffsetSlider = document.getElementById('yOffsetSlider');
        const flatshapeData = Ajax.loadJSON('res/flatshape.json');
        const testVertSource = Ajax.loadText('res/TestVert.glsl');
        const testFragSource = Ajax.loadText('res/TestFrag.glsl');
        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource));
        const flatshapeModel = Engine.bufferModel(gl, yield flatshapeData);
        testShader.onrender = () => {
            gl.uniform1f(testShader.xOffsetUniform, xOffsetSlider.valueAsNumber);
            gl.uniform1f(testShader.yOffsetUniform, yOffsetSlider.valueAsNumber);
        };
        const renderScene = () => {
            Engine.clearScreen(gl);
            testShader.render(flatshapeModel);
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
