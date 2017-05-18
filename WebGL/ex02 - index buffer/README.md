# ex02 - index buffer
The substance of this example resides in `./client/source/` and in `./client/resources/`
![render result](https://cloud.githubusercontent.com/assets/11017626/26199509/8daf3814-3bca-11e7-9dd0-df5727ac6851.png)

## Usage instructions:
1. Download this example
2. Execute `install.bat` (**Warning:** always read foreign .bat-files with notepad first to make sure nothing fishy is going on!)
3. Compile client source code with `compile.bat`
4. Start server with `run.bat`
5. Use your favourite browser and browse to `localhost:8000`

---
## Shaders
### Vertex shader
This shader shrinks all vectors to half their distance to the center before rendering which means the model will be scaled down to half the size:
```glsl
attribute vec3 pos;

void main(void) {
    gl_Position = vec4(pos * 0.5, 1);
}
```
### Fragment shader:
Nothing special, every pixel rendered for our model is rendered green:
```glsl
precision mediump float;

void main(void) {
    gl_FragColor = vec4(0, 1, 0, 1);
}
```
---
## WebGL example rendering a square with an index buffer
### Setting up square model
#### Create a hard coded square mesh
This mesh could be loaded from a resource but for this simple model it's hard coded to simplify example:
```typescript
const squareMesh = new Float32Array([
    -1,  1,  0,
    -1, -1,  0,
     1, -1,  0,
     1,  1,  0
])
```
#### Create hard coded square mesh indices
```typescript
const squareIndices = new Uint16Array([
    0, 1, 2,
    2, 3, 0
])
```
#### Send mesh data to GPU
Mesh data is sent to GPU:
```typescript
const vbo = gl.createBuffer() // Create buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vbo) // Select buffer object
// Store mesh on GPU:
gl.bufferData(gl.ARRAY_BUFFER, squareMesh, gl.STATIC_DRAW)
gl.bindBuffer(gl.ARRAY_BUFFER, null) // Deselect buffer object
```
#### Send index data to GPU
Index data is sent to GPU just like normal data is but with slightly different information about the data so the GPU knows what kind of data is being sent:
```typescript
const ibo = gl.createBuffer() // Create buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo) // Select buffer object
// Store index data on GPU:
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, squareIndices, gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null) // Deselect buffer object
```
### Defining render loop
#### Deselect buffer objects and shader programs
Since we now need to also select which index buffer object to use when we render we need to make sure we deselect the IBO when we're done rendering to avoid something tampering with our index data in the future:
```typescript
try {
    
    ...

} finally {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(null)
}
```
#### Render scene
Instead of using `drawArrays` we select our IBO and use `drawElements` to render our model:
```typescript
gl.useProgram(shaderProgram)
gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

gl.enableVertexAttribArray(shaderProgram_posAttribute)
gl.vertexAttribPointer(shaderProgram_posAttribute, 3, gl.FLOAT, false, 0, 0)

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
gl.drawElements(gl.TRIANGLES, squareIndices.length, gl.UNSIGNED_SHORT, 0)
```