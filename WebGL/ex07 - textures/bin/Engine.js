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
    function initScreen(gl) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
    }
    Engine.initScreen = initScreen;
    function clearScreen(gl) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    Engine.clearScreen = clearScreen;
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
    function bufferModel(gl, model) {
        const VBO = gl.createBuffer();
        const IBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.mesh), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);
        return { VBO: VBO, IBO: IBO, nIndices: model.indices.length };
    }
    Engine.bufferModel = bufferModel;
    function bufferTexture(gl, image) {
        const TBO = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, TBO);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return TBO;
    }
    Engine.bufferTexture = bufferTexture;
    function useTexture(gl, { id, location }, TBO) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, TBO);
        gl.uniform1i(location, id);
    }
    Engine.useTexture = useTexture;
})(Engine || (Engine = {}));
