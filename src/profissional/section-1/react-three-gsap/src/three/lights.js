import * as THREE from "three"

export function createAmbientLight(color="#ffffff", intensity=1){
    return new THREE.AmbientLight(color, intensity)
}

export function createDirectLight(color="#ffffff", intensity=1){
    return new THREE.DirectionalLight(color, intensity);
}

export function mudarDirecaoDirectLight(luz, x, y, z){
    luz.target.position.set(x, y, z);
}

export function mudarPosicaoDirectLight(luz, x, y, z){
    luz.position.set(x, y, z);
}

