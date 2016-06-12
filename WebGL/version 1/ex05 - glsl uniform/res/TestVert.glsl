attribute vec2 pos;
attribute vec2 uv;

uniform float xOffset;
uniform float yOffset;

varying vec2 uvcoord;

void main(void) {
    uvcoord = uv;
    gl_Position = vec4(pos + vec2(xOffset, yOffset), 0.0, 1.0);
}