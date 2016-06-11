precision mediump float;

uniform samplerCube map;

varying vec3 lookup;

void main(void) {
    vec3 normal = normalize(lookup);
    gl_FragColor = textureCube(map, normal);
}