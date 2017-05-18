attribute vec3 pos;

void main(void) {
    gl_Position = vec4(pos * 0.5, 1);
}