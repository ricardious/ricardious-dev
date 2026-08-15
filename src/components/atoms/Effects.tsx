import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FullScreenQuad, Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { LensDistortionPassGen } from 'three-lens-distortion';

type LensDistortionPass = InstanceType<ReturnType<typeof LensDistortionPassGen>>;

// Singleton compartido para que Scene pueda modificar distortion/focalLength
export const lensDistortionPass = { current: null as LensDistortionPass | null };

export default function Effects() {
	const { gl, scene, camera, size } = useThree();

	// biome-ignore lint/correctness/useExhaustiveDependencies: el composer se crea una sola vez; gl/scene/camera son estables durante la vida del canvas
	const composer = useMemo(() => {
		const LensDistortionPass = LensDistortionPassGen({ THREE, Pass, FullScreenQuad });

		const pass = new LensDistortionPass({
			distortion: new THREE.Vector2(0, 0),
			principalPoint: new THREE.Vector2(0, 0),
			focalLength: new THREE.Vector2(1, 1),
			skew: 0,
		});

		lensDistortionPass.current = pass;

		const effectComposer = new EffectComposer(gl);
		effectComposer.addPass(new RenderPass(scene, camera));
		effectComposer.addPass(pass);

		return effectComposer;
	}, []);

	useEffect(() => {
		composer.setSize(size.width, size.height);
	}, [composer, size]);

	useFrame((_, delta) => {
		composer.render(delta);
	}, 1);

	return null;
}
