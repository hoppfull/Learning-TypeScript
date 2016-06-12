precision mediump float;

varying vec2 uvcoord;

uniform sampler2D mainTex;
uniform sampler2D secTex;

void main(void) {
    gl_FragColor = texture2D(mainTex, uvcoord) + 0.5 * texture2D(secTex, uvcoord);
}