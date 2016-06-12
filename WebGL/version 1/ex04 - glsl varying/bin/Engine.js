var Engine;
(function (Engine) {
    function context(canvas) {
        const gl = (canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'));
        if (!gl)
            throw "Couldn't initialize WebGL!";
        return gl;
    }
    Engine.context = context;
    function initGl(gl) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
    }
    Engine.initGl = initGl;
    function clear(gl) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    Engine.clear = clear;
    function createShaderProgram(gl, vertexSource, fragmentSource) {
        function setupShader(shader, source) {
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                console.error("Shader:", gl.getShaderInfoLog(shader));
            return shader;
        }
        const vertShader = setupShader(gl.createShader(gl.VERTEX_SHADER), vertexSource);
        const fragShader = setupShader(gl.createShader(gl.FRAGMENT_SHADER), fragmentSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
            throw "program: " + gl.getProgramInfoLog(program);
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
            throw "program: " + gl.getProgramInfoLog(program);
        return program;
    }
    Engine.createShaderProgram = createShaderProgram;
    function createModelRenderer(gl, model) {
        const vbo = gl.createBuffer();
        const ibo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.mesh), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);
        return shader => {
            gl.useProgram(shader.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            shader.render();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0);
            shader.clean();
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        };
    }
    Engine.createModelRenderer = createModelRenderer;
})(Engine || (Engine = {}));
