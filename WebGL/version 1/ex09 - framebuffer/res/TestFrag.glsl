precision mediump float;

varying vec2 uvcoord;

uniform sampler2D tex;

void main(void) {
    gl_FragColor = texture2D(tex, uvcoord);
}