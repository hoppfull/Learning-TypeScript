## ex01 - hello triangle

The substance of this example resides in `./client/source/` and in `./client/resources/`

Usage instructions:
1. Download this example
2. Execute `install.bat` (**Warning:** always read foreign .bat-files with notepad first to make sure nothing fishy is going on!)
3. Compile client source code with `compile.bat`
4. Start server with `run.bat`
5. Use your favourite browser and browse to `localhost:8000`

---

### Shaders
#### Vertex shader
A vertex shader runs once for each vertex of a given mesh. This shader is defined to work with vertices with only a single attribute we've named "pos":
```glsl
attribute vec3 pos;

void main(void) {
    gl_Position = vec4(pos, 1);
}
```

#### Fragment shader:
A fragment shader runs once for each pixel rendering a given model. This shader is defined to always render a pixel green:
```glsl
precision mediump float;

void main(void) {
    gl_FragColor = vec4(0, 1, 0, 1);
}
```
