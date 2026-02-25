varying vec2 vUv;

void main() {
    vUv = uv; // uv é fornecido pelo Three.js
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}