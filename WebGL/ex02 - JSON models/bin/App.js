var App;
(function (App) {
    function run(canvas) {
        const gl = Engine.context(canvas);
        Engine.initGl(gl);
        Engine.clear(gl);
        Async.start(function* () {
            const vertSource = Async.loadDoc('res/vs.glsl');
            const fragSource = Async.loadDoc('res/fs.glsl');
            const triangleSource = Async.loadDoc('res/triangle.json');
            const glProgram = Engine.createShaderProgram(gl, yield vertSource, yield fragSource);
            const posAttribute = gl.getAttribLocation(glProgram, 'pos');
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            const triangle = JSON.parse(yield triangleSource);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle.mesh), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(posAttribute);
            gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.useProgram(glProgram);
            Engine.clear(gl);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        });
    }
    App.run = run;
})(App || (App = {}));
