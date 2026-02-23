import * as THREE from "three"

export const materialMap = {
  Normal: THREE.MeshNormalMaterial,
  Standard: THREE.MeshStandardMaterial,
  Basic: THREE.MeshBasicMaterial,
  Phong: THREE.MeshPhongMaterial,
  Lambert: THREE.MeshLambertMaterial,
  Physical: THREE.MeshPhysicalMaterial,
};

export const materialNames = {
  Normal: "Normal",
  Standard: "Standard",
  Basic: "Basic",
  Phong: "Phong",
  Lambert: "Lambert",
  Physical: "Physical",
}