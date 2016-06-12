attribute vec3 pos;

uniform float xOffset;
uniform float yOffset;

void main(void) {
    gl_Position = vec4(pos * 0.5 + vec3(xOffset, yOffset, 0.0), 1.0);
}