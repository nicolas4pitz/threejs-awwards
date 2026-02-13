import * as THREE from "three"

export function createAmbientLight(color="#ffffff", intensity=1){
    return new THREE.AmbientLight(color, intensity)
}

export function createDirectLight(color="#ffffff", intensity=1){
    return new THREE.DirectionalLight(color, intensity);
}

export function mudarDirecaoLight(luz, x, y, z){
    luz.target.rotation.set(x, y, z);
}

export function mudarPosicaoLight(luz, x, y, z){
    luz.position.set(x, y, z);
}

export function mudarRotationLight(luz, x, y, z){
    luz.rotation.set(x, y, z)
}

