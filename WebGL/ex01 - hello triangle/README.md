# ex01 - hello triangle

The substance of this example resides in `./client/source/` and in `./client/resources/`

Usage instructions:
1. Download this example
2. Execute `install.bat` (**Warning:** always read foreign .bat-files with notepad first to make sure nothing fishy is going on!)
3. Compile client source code with `compile.bat`
4. Start server with `run.bat`
5. Use your favourite browser and browse to `localhost:8000`

---

## Shaders
### Vertex shader
A vertex shader runs once for each vertex of a given mesh. This shader is defined to work with vertices with only a single attribute we've named "pos":
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
This utility function is not specific to WebGL. It just helps with loading resources asynchronously:
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
A WebGL context is required so that when we work with the GPU, resources do not clash with other applications or other contexts within our application:
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