attribute vec3 pos;
attribute vec3 norm;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

varying vec3 lookup;

void main(void) {
    lookup = norm;
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(pos, 1);
}