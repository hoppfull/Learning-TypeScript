var App;
(function (App) {
    function run(canvas) {
        const gl = Engine.context(canvas);
        Engine.initGl(gl);
        Async.start(function* () {
            const vertSource = Async.loadDoc('res/vs.glsl');
            const fragSource = Async.loadDoc('res/fs.glsl');
            const triangleSource = Async.loadDoc('res/triangle.json');
            const squareSource = Async.loadDoc('res/square.json');
            const glProgram = Engine.createShaderProgram(gl, yield vertSource, yield fragSource);
            const posAttribute = gl.getAttribLocation(glProgram, 'pos');
            const vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            const triangle = JSON.parse(yield triangleSource);
            const square = JSON.parse(yield squareSource);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square.mesh), gl.STATIC_DRAW);
            const ibo = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(square.indices), gl.STATIC_DRAW);
            gl.useProgram(glProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.enableVertexAttribArray(posAttribute);
            gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, 0, 0);
            Engine.clear(gl);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            gl.drawElements(gl.TRIANGLES, square.indices.length, gl.UNSIGNED_SHORT, 0);
        });
    }
    App.run = run;
})(App || (App = {}));
