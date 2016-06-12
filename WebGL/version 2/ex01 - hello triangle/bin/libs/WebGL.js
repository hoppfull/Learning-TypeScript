var WebGL;
(function (WebGL) {
    function context(canvas) {
        const gl = (canvas.getContext('webgl', { alpha: false }) ||
            canvas.getContext('experimental-webgl', { alpha: false }));
        if (!gl)
            throw "Couldn't initialize WebGL!";
        return gl;
    }
    WebGL.context = context;
    function initContext(gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
    }
    WebGL.initContext = initContext;
    function clearContext(gl) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    WebGL.clearContext = clearContext;
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
    WebGL.createShaderProgram = createShaderProgram;
    function bufferModel(gl, model) {
        const VBO = gl.createBuffer();
        const IBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.mesh), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return { VBO: VBO, IBO: IBO, nIndices: model.indices.length };
    }
    WebGL.bufferModel = bufferModel;
    function bufferCubeMap(gl, posX, negX, posY, negY, posZ, negZ) {
        const TBO = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, TBO);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posX);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, negX);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posY);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, negY);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posZ);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, negZ);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        return TBO;
    }
    WebGL.bufferCubeMap = bufferCubeMap;
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
    WebGL.bufferTexture = bufferTexture;
    function createFramebufferTexture(gl, width, height) {
        const TBO = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, TBO);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return TBO;
    }
    WebGL.createFramebufferTexture = createFramebufferTexture;
    function drawOnFramebuffer(gl, FBO, targetTexture, cb) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, FBO);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, targetTexture, 0);
        clearContext(gl);
        cb();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    WebGL.drawOnFramebuffer = drawOnFramebuffer;
    function useTexture(gl, { id, location }, TBO) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, TBO);
        gl.uniform1i(location, id);
    }
    WebGL.useTexture = useTexture;
    function drawWithShader(gl, shader, { VBO, IBO, nIndices }, cb) {
        gl.useProgram(shader.program);
        cb();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        shader.attributes.forEach(({ id, size, stride }) => {
            gl.enableVertexAttribArray(id);
            gl.vertexAttribPointer(id, size, gl.FLOAT, false, shader.rowSize * 4, stride * 4);
        });
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.drawElements(gl.TRIANGLES, nIndices, gl.UNSIGNED_SHORT, 0);
        shader.attributes.forEach(({ id }) => gl.disableVertexAttribArray(id));
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.useProgram(null);
    }
    WebGL.drawWithShader = drawWithShader;
})(WebGL || (WebGL = {}));
