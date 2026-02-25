// Recebe a UV do vertex shader
varying vec2 vUv;

void main() {
    // Usa a UV para colorir (exemplo: degrade)
    gl_FragColor = vec4(vUv, 0.0, 1.0);
}