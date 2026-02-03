import arrowRight from "@assets/icons/arrow-right.svg";
import DistortionMaterial from "@atoms/DistortionMaterial";
import { useCursorStore } from "@lib/store/cursor";
import { Html, useProgress, useTexture } from "@react-three/drei";
import {
  Canvas,
  extend,
  events as r3fEvents,
  useFrame,
} from "@react-three/fiber";
import gsap from "gsap";
import {
  createRef,
  type RefObject,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Group, Mesh, ShaderMaterial, Texture } from "three";
import { Vector3 } from "three";
import projects, { type Project } from "@/lib/constants/projects";

// Custom type for DistortionMaterial with uniforms
interface DistortionMaterialType extends ShaderMaterial {
  time: number;
  speed: number;
  hoverValue: number;
  tex: Texture | null;
  rgbShiftStrength: number;
  textureAspect: number;
  frameAspect: number;
}

// Extend the DistortionMaterial for JSX usage
extend({ DistortionMaterial });

// Declare the distortionMaterial JSX element
declare module "@react-three/fiber" {
  interface ThreeElements {
    distortionMaterial: {
      ref?: React.Ref<DistortionMaterialType>;
      tex?: Texture | null;
      speed?: number;
      rgbShiftStrength?: number;
      hoverValue?: number;
      textureAspect?: number;
      frameAspect?: number;
    };
  }
}

const PROJECT_HEIGHT = 70;

const scrollArea: RefObject<HTMLDivElement | null> = createRef();

const planeSizes = {
  mobile: [0.7, 1] as [number, number],
  tablet: [1.4, 0.9] as [number, number],
  desktop: [2.34, 1.36] as [number, number],
};

const planePositions = {
  mobile: { distanceX: 0.05, distanceY: 3.5 },
  tablet: { distanceX: 0.1, distanceY: 2 },
  desktop: { distanceX: 0.16, distanceY: 1.18 },
};

// Simple lerp function (frame-independent when delta is provided)
const lerp = (start: number, end: number, factor: number, delta = 1) => {
  const t = 1 - (1 - factor) ** (delta * 60);
  return start + (end - start) * t;
};

// Map range utility
const mapRange = (
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  value: number,
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

let lastScrollTop = 0;
let speed = 0;

interface ShaderPlaneProps {
  index: number;
  texture: Texture;
  project: Project;
  isInView: boolean;
}

function ShaderPlane({ index, texture, project, isInView }: ShaderPlaneProps) {
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<DistortionMaterialType>(null);

  const [hovering, setHovering] = useState(false);
  const hoverValue = useRef({ value: 1 });
  const setHoveringCanvas = useCursorStore((state) => state.setHoveringCanvas);

  const [media, setMedia] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  useEffect(() => {
    const checkMedia = () => {
      if (window.innerWidth < 480) setMedia("mobile");
      else if (window.innerWidth < 769) setMedia("tablet");
      else setMedia("desktop");
    };
    checkMedia();
    window.addEventListener("resize", checkMedia);
    return () => window.removeEventListener("resize", checkMedia);
  }, []);

  useFrame((_, delta) => {
    if (!matRef.current || !scrollArea.current) return;

    matRef.current.time += delta;

    const newSpeed = Math.abs(scrollArea.current.scrollTop - lastScrollTop);
    speed = lerp(speed, newSpeed, 0.03, delta);

    matRef.current.speed = speed;
    lastScrollTop = scrollArea.current.scrollTop;
  });

  useEffect(() => {
    if (!meshRef.current) return;

    meshRef.current.position.setFromSphericalCoords(
      20,
      Math.PI / 2,
      planePositions[media].distanceX * index,
    );
    let pos = new Vector3().copy(meshRef.current.position);
    // by multiplying the vector by a scalar of 2 we can get the "opposite" of the vector from plane pos to origin
    pos = pos.multiplyScalar(2);
    meshRef.current.lookAt(pos);
    meshRef.current.position.y += index / planePositions[media].distanceY;
  }, [media, index]);

  useEffect(() => {
    setHoveringCanvas(hovering);
    const tween = gsap.to(hoverValue.current, {
      value: hovering ? 0 : 1,
      onUpdate: () => {
        if (matRef.current) {
          matRef.current.hoverValue = hoverValue.current.value;
        }
      },
    });
    return () => {
      tween.kill();
      setHoveringCanvas(false);
    };
  }, [hovering, setHoveringCanvas]);

  const clickHandler = () => {
    if (!scrollArea.current) return;

    scrollArea.current.scrollTop =
      index *
      ((scrollArea.current.children[0].clientHeight - window.innerHeight) /
        (projects.length - 1));

    setTimeout(() => {
      window.location.href = `/works/${project.path}`;
    }, 300);
  };

  return (
    <mesh
      onClick={clickHandler}
      onPointerOver={() => setHovering(true)}
      onPointerOut={() => setHovering(false)}
      ref={meshRef}
    >
      <planeGeometry args={[...planeSizes[media], 32, 32]} />
      <distortionMaterial
        frameAspect={planeSizes[media][0] / planeSizes[media][1]}
        textureAspect={
          texture.image instanceof HTMLImageElement
            ? texture.image.naturalWidth / texture.image.naturalHeight
            : 1
        }
        ref={matRef}
        tex={texture}
        rgbShiftStrength={0}
      />
      <Html
        portal={{ current: document.body }}
        center
        className={`pointer-events-none -z-10 transition-opacity duration-200 ${isInView ? "" : "hidden"}`}
        position={[0, 0, 0.25]}
      >
        <div className="flex items-center flex-col flex-nowrap">
          <h1 className="text-h1 serif uppercase whitespace-nowrap text-white">
            {project.name}
          </h1>
          <div
            className={`mt-4 flex flex-row flex-nowrap items-center transition-transform duration-300 ${hovering ? "translate-x-4" : ""}`}
          >
            <span className="text-white font-body uppercase whitespace-nowrap text-[10px] tracking-[0.4px]">
              open project
            </span>
            <div className="ml-2.5 w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <img
                src={arrowRight.src}
                alt=""
                className="w-[60%] h-[60%] opacity-60"
              />
            </div>
          </div>
        </div>
      </Html>
    </mesh>
  );
}

let scrollValue = 0;

function Scene() {
  const covers = useTexture(projects.map((p) => p.coverImgSmall));

  const group = useRef<Group>(null);
  const vec3 = useRef(new Vector3());
  const [planeInView, setPlaneInView] = useState(0);

  const [media, setMedia] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  useEffect(() => {
    const checkMedia = () => {
      if (window.innerWidth < 480) setMedia("mobile");
      else if (window.innerWidth < 769) setMedia("tablet");
      else setMedia("desktop");
    };
    checkMedia();
    window.addEventListener("resize", checkMedia);
    return () => window.removeEventListener("resize", checkMedia);
  }, []);

  useFrame(({ camera }, delta) => {
    if (!scrollArea.current) return;

    const scrollHeight =
      scrollArea.current.children[0].clientHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    scrollValue = mapRange(
      0,
      1,
      0,
      projects.length - 1,
      scrollArea.current.scrollTop / scrollHeight,
    );

    const planeInViewTemp = Math.round(scrollValue);
    if (planeInView !== planeInViewTemp) setPlaneInView(planeInViewTemp);

    const camPosition = vec3.current.setFromSphericalCoords(
      21.5,
      Math.PI / 2,
      planePositions[media].distanceX * scrollValue,
    );

    camera.position.x = lerp(camera.position.x, camPosition.x, 0.1, delta);
    camera.position.y = lerp(camera.position.y, camPosition.y, 0.1, delta);
    camera.position.z = lerp(camera.position.z, camPosition.z, 0.1, delta);
    camera.position.y = lerp(
      camera.position.y,
      camera.position.y + scrollValue / planePositions[media].distanceY,
      0.1,
      delta,
    );
    camera.lookAt(0, scrollValue / planePositions[media].distanceY, 0);
    camera.updateProjectionMatrix();
  });

  return (
    <group ref={group}>
      {projects.map((project, index) => (
        <ShaderPlane
          isInView={index > planeInView - 3 && index < planeInView + 3}
          index={index}
          key={project.id}
          texture={covers[index]}
          project={project}
        />
      ))}
    </group>
  );
}

export default function WorksScene() {
  const scrollProgressBar = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollProgressContainer = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();

  // Animate container width based on loading progress
  useLayoutEffect(() => {
    if (scrollProgressContainer.current) {
      const width = `${progress}vw`;
      gsap.to(scrollProgressContainer.current, { width, duration: 1 });
    }
  }, [progress]);

  useLayoutEffect(() => {
    if (scrollArea.current) {
      scrollArea.current.scrollTop += 1;
    }
  }, []);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    if (scrollTop > 5 && !hasScrolled) {
      setHasScrolled(true);
    }

    if (scrollProgressBar.current && scrollArea.current) {
      const scrollHeight =
        scrollArea.current.children[0].clientHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        gsap.to(scrollProgressBar.current, {
          width: `${scrollProgress}%`,
        });
      }
    }
  };

  return (
    <div className="bg-background transition-colors duration-600 h-screen w-screen relative overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 24], far: 100 }}
        onCreated={(state) => {
          if (scrollArea.current) state.events.connect?.(scrollArea.current);
        }}
        events={(store) => {
          const base = r3fEvents(store);

          return {
            ...base,
            compute: (event, state) => {
              const scrollTop = scrollArea.current?.scrollTop ?? 0;

              const x = event.offsetX;
              const y = event.offsetY - scrollTop;

              state.pointer.set(
                (x / state.size.width) * 2 - 1,
                -(y / state.size.height) * 2 + 1,
              );
              state.raycaster.setFromCamera(state.pointer, state.camera);
            },
          };
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div
        ref={scrollArea as React.RefObject<HTMLDivElement>}
        className="fixed top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden scrollbar-hide"
        onScroll={onScroll}
      >
        <div
          style={{
            height: `${(projects.length - 1) * PROJECT_HEIGHT}vh`,
            width: "100vw",
          }}
        />
      </div>

      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-28 font-body text-text z-1000 mb-4 uppercase tracking-wide text-[10px] transition-opacity duration-1200 delay-300 ${hasScrolled ? "opacity-0" : "opacity-100"}`}
      >
        ( scroll down )
      </div>

      <div
        ref={scrollProgressContainer}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-0.5 bg-text-disabled2 max-md:bottom-0 opacity-0 animate-fadeIn"
      >
        <div
          ref={scrollProgressBar}
          className="bg-text-standard h-full w-0 transition-[width] duration-100"
        />
      </div>
    </div>
  );
}
