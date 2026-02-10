import * as THREE from "three"


export function createDirectLight(light=1, intensity=1){
    const direcional = new THREE.DirectionalLight(light, intensity);
}

export function mudarDirecaoDirectLight(luz, x, y, z){
    luz.target.position.set(x, y, z);
}

export function mudarPosicaoDirectLight(luz, x, y, z){
    luz.position.set(x, y, z);
}

