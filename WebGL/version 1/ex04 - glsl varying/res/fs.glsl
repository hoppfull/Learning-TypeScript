precision mediump float;

varying vec2 uvcoord;

void main(void) {
    gl_FragColor = vec4(uvcoord, 1.0, 1.0);
}