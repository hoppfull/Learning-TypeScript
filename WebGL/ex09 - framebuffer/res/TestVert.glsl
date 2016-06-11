attribute vec2 pos;
attribute vec2 uv;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

varying vec2 uvcoord;

void main(void) {
    uvcoord = uv;
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(pos, 0, 1);
}