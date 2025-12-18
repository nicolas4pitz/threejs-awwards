

export const material = new THREE.ShaderMaterial( {
	uniforms: {
		time: { value: 1.0 },
		resolution: { value: new THREE.Vector2() }
	},
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );

export default material