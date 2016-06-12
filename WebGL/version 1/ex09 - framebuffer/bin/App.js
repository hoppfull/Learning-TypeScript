var App;
(function (App) {
    function* run() {
        const gl = Engine.context(document.getElementById('mainCanvas'));
        Engine.initScreen(gl);
        const xOffsetSlider = document.getElementById('xOffsetSlider');
        const yOffsetSlider = document.getElementById('yOffsetSlider');
        const zOffsetSlider = document.getElementById('zOffsetSlider');
        const glesImage = Ajax.loadImage('res/OpenGL_ES_Logo.png');
        const squareData = Ajax.loadJSON('res/square.json');
        const screenData = Ajax.loadJSON('res/screen.json');
        const testVertSource = Ajax.loadText('res/TestVert.glsl');
        const testFragSource = Ajax.loadText('res/TestFrag.glsl');
        const screenVertSource = Ajax.loadText('res/ScreenVert.glsl');
        const screenFragSource = Ajax.loadText('res/ScreenFrag.glsl');
        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource));
        const screenShader = new ScreenShader(gl, Engine.createShaderProgram(gl, yield screenVertSource, yield screenFragSource));
        const squareModel = Engine.bufferModel(gl, yield squareData);
        const screenModel = Engine.bufferModel(gl, yield screenData);
        const glesTexture = Engine.bufferTexture(gl, yield glesImage);
        const fboTexture = Engine.createFBOTexture(gl, gl.canvas.width, gl.canvas.height);
        const FBO = gl.createFramebuffer();
        const IdentityMatrix = mat4.create();
        const ModelMatrix = mat4.create();
        const ViewMatrix = mat4.lookAt(mat4.create(), [0.5, -2, 2], [0, 0, 0], [0, 0, 1]);
        const ProjectionMatrix = mat4.perspective(mat4.create(), 1, gl.canvas.width / gl.canvas.height, 0.1, 5);
        testShader.onrender = () => {
            gl.uniformMatrix4fv(testShader.ModelMatrixUniform, false, mat4.translate(ModelMatrix, IdentityMatrix, [xOffsetSlider.valueAsNumber, yOffsetSlider.valueAsNumber, zOffsetSlider.valueAsNumber]));
            gl.uniformMatrix4fv(testShader.ViewMatrixUniform, false, ViewMatrix);
            gl.uniformMatrix4fv(testShader.ProjectionMatrixUniform, false, ProjectionMatrix);
            Engine.useTexture(gl, testShader.tex, glesTexture);
        };
        screenShader.onrender = () => {
            Engine.useTexture(gl, screenShader.texture, fboTexture);
        };
        const renderScene = () => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, FBO);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fboTexture, 0);
            Engine.clearScreen(gl);
            testShader.render(screenModel);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            Engine.clearScreen(gl);
            screenShader.render(screenModel);
        };
        renderScene();
        xOffsetSlider.oninput = e => {
            renderScene();
        };
        yOffsetSlider.oninput = e => {
            renderScene();
        };
        zOffsetSlider.oninput = e => {
            renderScene();
        };
    }
    App.run = run;
})(App || (App = {}));
