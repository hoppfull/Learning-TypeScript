var App;
(function (App) {
    function* run() {
        const gl = Engine.context(document.getElementById('mainCanvas'));
        Engine.initScreen(gl);
        const xOffsetSlider = document.getElementById('xOffsetSlider');
        const yOffsetSlider = document.getElementById('yOffsetSlider');
        const zOffsetSlider = document.getElementById('zOffsetSlider');
        const sphereData = Ajax.loadJSON('res/sphere.json');
        const cubemap_posX = Ajax.loadImage('res/cubemap_posX.png');
        const cubemap_negX = Ajax.loadImage('res/cubemap_negX.png');
        const cubemap_posY = Ajax.loadImage('res/cubemap_posY.png');
        const cubemap_negY = Ajax.loadImage('res/cubemap_negY.png');
        const cubemap_posZ = Ajax.loadImage('res/cubemap_posZ.png');
        const cubemap_negZ = Ajax.loadImage('res/cubemap_negZ.png');
        const testVertSource = Ajax.loadText('res/TestVert.glsl');
        const testFragSource = Ajax.loadText('res/TestFrag.glsl');
        const testShader = new TestShader(gl, Engine.createShaderProgram(gl, yield testVertSource, yield testFragSource));
        const sphereModel = Engine.bufferModel(gl, yield sphereData);
        const cubemapTBO = Engine.bufferCubeMap(gl, yield cubemap_posY, yield cubemap_negY, yield cubemap_posX, yield cubemap_negX, yield cubemap_posZ, yield cubemap_negZ);
        const IdentityMatrix = mat4.create();
        const ModelMatrix = mat4.create();
        const ViewMatrix = mat4.lookAt(mat4.create(), [0.5, -2, 2], [0, 0, 0], [0, 0, 1]);
        const ProjectionMatrix = mat4.perspective(mat4.create(), 1, gl.canvas.width / gl.canvas.height, 0.1, 10);
        testShader.onrender = () => {
            gl.uniformMatrix4fv(testShader.ModelMatrixUniform, false, ModelMatrix);
            gl.uniformMatrix4fv(testShader.ViewMatrixUniform, false, mat4.lookAt(mat4.create(), [xOffsetSlider.valueAsNumber * 5, yOffsetSlider.valueAsNumber * 5, zOffsetSlider.valueAsNumber * 5], [0, 0, 0], [0, 0, 1]));
            gl.uniformMatrix4fv(testShader.ProjectionMatrixUniform, false, ProjectionMatrix);
            Engine.useCubeMap(gl, testShader.map, cubemapTBO);
        };
        const renderScene = () => {
            Engine.clearScreen(gl);
            testShader.render(sphereModel);
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
