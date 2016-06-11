precision mediump float;

varying vec2 uvcoord;

uniform sampler2D texture;

void main(void) {
    gl_FragColor = 0.5 *  texture2D(texture, uvcoord);
}