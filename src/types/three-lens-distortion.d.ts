declare module "three-lens-distortion" {
  import type * as THREE from "three";
  import type { Pass } from "three/examples/jsm/postprocessing/Pass.js";
  import type { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass.js";

  export function LensDistortionPassGen(dependencies: {
    THREE: typeof THREE;
    Pass: typeof Pass;
    FullScreenQuad: typeof FullScreenQuad;
  }): new (params: {
    distortion?: THREE.Vector2;
    principalPoint?: THREE.Vector2;
    focalLength?: THREE.Vector2;
    skew?: number;
  }) => Pass & {
    distortion: THREE.Vector2;
    principalPoint: THREE.Vector2;
    focalLength: THREE.Vector2;
    skew: number;
    renderToScreen: boolean;
  };
}
