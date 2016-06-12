attribute vec2 pos;
attribute vec2 uv;

varying vec2 uvcoord;

void main(void) {
    uvcoord = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}