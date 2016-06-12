module WebGL {
    export interface IMeshData {
        mesh: number[]
        indices: number[]
    }

    export interface IModelData {
        VBO: WebGLBuffer
        IBO: WebGLBuffer
        nIndices: number
    }

    export interface ITextureUniform {
        id: number
        location: WebGLUniformLocation
    }

    export interface IAttribute {
        id: number
        size: number
        stride: number
    }

    export interface IShaderData {
        program: WebGLProgram
        rowSize: number
        attributes: IAttribute[]
    }

    export function context(canvas: HTMLCanvasElement) {
        const gl = <WebGLRenderingContext>(
            canvas.getContext('webgl', { alpha: false }) ||
            canvas.getContext('experimental-webgl', { alpha: false }))
        if (!gl) throw "Couldn't initialize WebGL!"
        return gl
    }

    export function initContext(gl: WebGLRenderingContext) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.enable(gl.DEPTH_TEST)
        gl.enable(gl.CULL_FACE)
        gl.frontFace(gl.CCW)
        gl.cullFace(gl.BACK)
    }

    export function clearContext(gl: WebGLRenderingContext) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    }

    export function createShaderProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
        function setupShader(shader: WebGLShader, source: string) {
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                console.error("Shader:", gl.getShaderInfoLog(shader))
            return shader
        }

        const vertShader = setupShader(gl.createShader(gl.VERTEX_SHADER), vertexSource)
        const fragShader = setupShader(gl.createShader(gl.FRAGMENT_SHADER), fragmentSource)

        const program = gl.createProgram()
        gl.attachShader(program, vertShader)
        gl.attachShader(program, fragShader)

        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
            throw "program: " + gl.getProgramInfoLog(program)
        gl.validateProgram(program)
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
            throw "program: " + gl.getProgramInfoLog(program)

        return program
    }

    export function bufferModel(gl: WebGLRenderingContext, model: IMeshData): IModelData {
        const VBO = gl.createBuffer()
        const IBO = gl.createBuffer()

        gl.bindBuffer(gl.ARRAY_BUFFER, VBO)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.mesh), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        return { VBO, IBO, nIndices: model.indices.length }
    }

    type img = HTMLImageElement
    export function bufferCubeMap(gl: WebGLRenderingContext, posX: img, negX: img, posY: img, negY: img, posZ: img, negZ: img) {
        const TBO = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, TBO)

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posX)
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, negX)
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posY)
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, negY)
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posZ)
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, negZ)

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)

        return TBO
    }

    export function bufferTexture(gl: WebGLRenderingContext, image: img) {
        const TBO = gl.createTexture()

        gl.bindTexture(gl.TEXTURE_2D, TBO)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.bindTexture(gl.TEXTURE_2D, null)

        return TBO
    }

    export function createFramebufferTexture(gl: WebGLRenderingContext, width: number, height: number) {
        const TBO = gl.createTexture()

        gl.bindTexture(gl.TEXTURE_2D, TBO)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
        gl.bindTexture(gl.TEXTURE_2D, null)

        return TBO
    }

    export function drawOnFramebuffer(gl: WebGLRenderingContext, FBO: WebGLFramebuffer, targetTexture: WebGLTexture, cb: () => void) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, FBO)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, targetTexture, 0)
        clearContext(gl)
        cb()
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    export function useTexture(gl: WebGLRenderingContext, {id, location}: ITextureUniform, TBO: WebGLTexture) {
        gl.activeTexture(gl.TEXTURE0 + id)
        gl.bindTexture(gl.TEXTURE_2D, TBO)
        gl.uniform1i(location, id)
    }

    export function drawWithShader(gl: WebGLRenderingContext, shader: IShaderData, {VBO, IBO, nIndices}: IModelData, cb: () => void) {
        gl.useProgram(shader.program)
        cb()

        gl.bindBuffer(gl.ARRAY_BUFFER, VBO)
        shader.attributes.forEach(({ id, size, stride }) => {
            gl.enableVertexAttribArray(id)
            gl.vertexAttribPointer(id, size, gl.FLOAT, false, shader.rowSize * 4, stride * 4)
        })
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO)
        gl.drawElements(gl.TRIANGLES, nIndices, gl.UNSIGNED_SHORT, 0)

        shader.attributes.forEach(({id}) => gl.disableVertexAttribArray(id))
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        gl.useProgram(null)
    }
}