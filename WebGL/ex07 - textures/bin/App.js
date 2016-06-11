var App;
(function (App) {
    function* run() {
        const gl = Engine.context(document.getElementById('mainCanvas'));
        Engine.initScreen(gl);
        const xOffsetSlider = document.getElementById('xOffsetSlider');
        const yOffsetSlider = document.getElementById('yOffsetSlider');
        const webglImage = Ajax.loadImage('res/WebGL_Logo.png');
        const glesImage = Ajax.loadImage('res/OpenGL_ES_Logo.png');
        const squareData = Ajax.loadJSON('res/square.json');
        const testVertSource = Ajax.loadText('res/TestVert.glsl');
        const testFragSource = Ajax.loadText('res/TestFrag.glsl');
        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource));
        const squareModel = Engine.bufferModel(gl, yield squareData);
        const webglTexture = Engine.bufferTexture(gl, yield webglImage);
        const glesTexture = Engine.bufferTexture(gl, yield glesImage);
        testShader.onrender = () => {
            gl.uniform1f(testShader.xOffsetUniform, xOffsetSlider.valueAsNumber);
            gl.uniform1f(testShader.yOffsetUniform, yOffsetSlider.valueAsNumber);
            Engine.useTexture(gl, testShader.mainTex, webglTexture);
            Engine.useTexture(gl, testShader.secTex, glesTexture);
        };
        const renderScene = () => {
            Engine.clearScreen(gl);
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
