# ex01 - hello triangle
The substance of this example resides in `./client/source/` and in `./client/resources/`
![render result](https://cloud.githubusercontent.com/assets/11017626/25997610/029deace-371d-11e7-9183-328e4df94300.png)

## Usage instructions:
1. Download this example
2. Execute `install.bat` (**Warning:** always read foreign .bat-files with notepad first to make sure nothing fishy is going on!)
3. Compile client source code with `compile.bat`
4. Start server with `run.bat`
5. Use your favourite browser and browse to `localhost:8000`

---
## Shaders
### Vertex shader
A vertex shader runs once for each vertex of a given mesh. This shader is defined to work with vertices with only a single attribute we've named *pos*:
```glsl
attribute vec3 pos;

void main(void) {
    gl_Position = vec4(pos, 1);
}
```
### Fragment shader:
A fragment shader runs once for each pixel rendering a given model. This shader is defined to always render a pixel green:
```glsl
precision mediump float;

void main(void) {
    gl_FragColor = vec4(0, 1, 0, 1);
}
```
---
## Basic WebGL example rendering a single triangle
### Utility function for loading files asynchronously
This utility function is not specific to **WebGL**. It just helps with loading resources asynchronously:
```typescript
function load(file: string): Promise<string> {
    return new Promise(resolve => {
        const request = new XMLHttpRequest()
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200)
                resolve(request.responseText)
        }
        request.open('GET', file)
        request.send()
    })
}
```
### Getting shader source code resources:
As soon as module `App` is loaded, these files start downloading asynchronously in the background until we need them:
```typescript
module App {
    ...

    const vShaderSource = load('vs.glsl')
    const fShaderSource = load('fs.glsl')

    ...
}
```
### Setup
#### Initialize WebGL context
A **WebGL** context is required so that when we work with the GPU, resources do not clash with other applications or other contexts within our application:
```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById('myCanvas')
const gl = myCanvas.getContext('webgl') || myCanvas.getContext('experimental-webgl')
if (!gl) throw "Could not retrieve WebGL context! Your browser may not support it! :("
```
#### Configure our WebGL context
Some options for basic optimization, viewport resolution and background color is set:
```typescript
gl.viewport(0, 0, myCanvas.width, myCanvas.height)
gl.clearColor(0, 0, 1, 1)
gl.enable(gl.CULL_FACE)
gl.frontFace(gl.CCW)
gl.cullFace(gl.BACK)
```
### Compiling shader program
#### Setup shaders
Empty shaders are initialized and then loaded with shader source code:
```typescript
const vShader = gl.createShader(gl.VERTEX_SHADER)
const fShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vShader, await vShaderSource)
gl.shaderSource(fShader, await fShaderSource)
```
Shaders are compiled and compilation status is checked for errors:
```typescript
gl.compileShader(vShader)
gl.compileShader(fShader)

if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS))
    throw `Vertex shader compilation error: ${gl.getShaderInfoLog(vShader)}`

if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS))
    throw `Fragment shader compilation error: ${gl.getShaderInfoLog(fShader)}`
```
#### Compile shader program
An empty shader program is created. Shaders are attached to it and program is compiled. Shaders are not needed after this point so they are detached from shader program and deleted to free up resources. Compilation status is finally checked for errors before proceeding:
```typescript
const shaderProgram = gl.createProgram()

gl.attachShader(shaderProgram, vShader)
gl.attachShader(shaderProgram, fShader)

gl.linkProgram(shaderProgram)

gl.detachShader(shaderProgram, vShader)
gl.detachShader(shaderProgram, fShader)

gl.deleteShader(vShader)
gl.deleteShader(fShader)

if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    throw `Shader program linking error: ${gl.getProgramInfoLog(shaderProgram)}`

gl.validateProgram(shaderProgram)
if (!gl.getProgramParameter(shaderProgram, gl.VALIDATE_STATUS))
    throw `Shader program validation error: ${gl.getProgramInfoLog(shaderProgram)}`
```
#### Retrieve id for attribute *pos* on shader
We retrieve the id for the attribute we named *pos* on the vertex shader in our shader program. In order to retrieve the correct id we must first select the shader program from which we retrieve the id. After we've retrieved the id, we deselect the shader program:
```typescript
gl.useProgram(shaderProgram) // Select shader program
const shaderProgram_posAttribute = gl.getAttribLocation(shaderProgram, 'pos')
gl.useProgram(null) // Deselect shader program
```
### Setting up triangle model
#### Create a hard coded triangle mesh
This mesh could be loaded from a resource but for this simple model it's hard coded to simplify example:
```typescript
const triangleMesh = new Float32Array([
    0, 1, 0,
    -1, -1, 0,
    1, -1, 0
])
```
#### Send mesh data to GPU
A buffer object is allocated on the GPU and the returned buffer id is saved. Then the buffer is selected and the mesh data is sent to the GPU in the currently selected buffer before buffer is deselected:
```typescript
const vbo = gl.createBuffer() // Create buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vbo) // Select buffer object
// Store mesh on GPU:
gl.bufferData(gl.ARRAY_BUFFER, triangleMesh, gl.STATIC_DRAW)
gl.bindBuffer(gl.ARRAY_BUFFER, null) // Deselect buffer object
```
### Defining render loop
#### Setup loop structure
This pattern is not specific to **WebGL**, a while loop could have been used. This is however the preferred way of doing a render loop in the browser with **JavaScript**. **JavaScript** has tail call optimization so eternal recursion like this is fine. `requestAnimationFrame` executes callback when a new frame is rendered in the browser. When the browser is out of focus, it stops rendering which is good because why render if you're not looking at it? It also limit rendering to 30fps. The `time`-argument is passed the absolute time since application start by `requestAnimationFrame`.
```typescript
const render = (time?: number) => {

    ...

    window.requestAnimationFrame(render)
}

render()
```
#### Clear screen before redrawing
```typescript
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
```
#### Deselect buffer objects and shader programs
This `try`/`finally` structure is used to deselect all buffers after each rendering to make sure these resources are not accidentally used in case something goes wrong in the loop:
```typescript
try {
    
    ...

} finally {
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(null)
}
```
#### Render scene
Appropriate shader program and buffer object is selected. Then the interaction between the selected shader progam and the selected triangle mesh is described. Finally the model is rendered:
```typescript
gl.useProgram(shaderProgram)
gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

gl.enableVertexAttribArray(shaderProgram_posAttribute)
gl.vertexAttribPointer(shaderProgram_posAttribute, 3, gl.FLOAT, false, 0, 0)

gl.drawArrays(gl.TRIANGLES, 0, 3)
```