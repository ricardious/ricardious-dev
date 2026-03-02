import DistortionMaterial from "@atoms/DistortionMaterial";
import Effects, { lensDistortionPass } from "@atoms/Effects";
import projects from "@lib/constants/projects";
import { useCursorStore } from "@lib/store/cursor";
import { OrbitControls, Plane, Text, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  createRef,
  type ComponentRef,
  type RefObject,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Mesh, ShaderMaterial, Texture, Vector3Like } from "three";
import * as THREE from "three";

interface DistortionMaterialType extends ShaderMaterial {
  time: number;
  speed: number;
  hoverValue: number;
  tex: Texture | null;
  rgbShiftStrength: number;
  textureAspect: number;
  frameAspect: number;
}

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

extend({ DistortionMaterial });

type OrbitControlsRef = ComponentRef<typeof OrbitControls>;

interface ItemData {
  x: number;
  y: number;
  width: number;
  height: number;
}

const vec3 = new THREE.Vector3();
const tempVec = new THREE.Vector3();
const speedRef = { current: 0 };
const controlsRef = createRef<OrbitControlsRef>();

const visibleBox = (camera: THREE.PerspectiveCamera, z: number) => {
  const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const height = t * 2 * (camera.position.z - z);
  const width = height * camera.aspect;
  return { width, height };
};

const isColliding = (
  items: ItemData[],
  testedItem: { x: number; y: number; width: number; height: number },
) => {
  for (const item of items) {
    if (
      testedItem.x < item.x + item.width * 1.5 &&
      testedItem.x + testedItem.width * 1.5 > item.x &&
      testedItem.y < item.y + item.height * 1.5 &&
      testedItem.height * 1.5 + testedItem.y > item.y
    ) {
      return true;
    }
  }
  return false;
};

const isCollidingOne = (item: DOMRect, testedItem: DOMRect) => {
  return (
    testedItem.x < item.x + item.width &&
    testedItem.x + testedItem.width > item.x &&
    testedItem.y < item.y + item.height &&
    testedItem.height + testedItem.y > item.y
  );
};

const getNewPosition = (minRadius: number) => {
  vec3
    .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    .normalize()
    .multiplyScalar(minRadius);
  return { x: vec3.x, y: vec3.y };
};

const lerp = (start: number, end: number, factor: number, delta = 1) => {
  const t = 1 - (1 - factor) ** (delta * 60);
  return start + (end - start) * t;
};

function ShaderPlane({
  itemData,
  texture,
  name,
}: {
  itemData: ItemData;
  texture: Texture;
  name: string;
}) {
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<DistortionMaterialType>(null);
  const textMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const [hovering, setHovering] = useState(false);
  const hoverValue = useRef({ value: 0 });
  const setHoveringCanvas = useCursorStore((state) => state.setHoveringCanvas);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.time += delta;
    matRef.current.speed = speedRef.current ?? 0;
  });

  useEffect(() => {
    setHoveringCanvas(hovering);
    const from = hoverValue.current.value;
    const to = hovering ? 1 : 0;
    const duration = 150;
    let start = 0;
    let raf = 0;

    const step = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const next = from + (to - from) * progress;
      hoverValue.current.value = next;
      if (textMaterial.current) textMaterial.current.opacity = next;
      if (progress < 1) raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(raf);
      setHoveringCanvas(false);
    };
  }, [hovering, setHoveringCanvas]);

  return (
    <mesh
      ref={meshRef}
      position={[itemData.x, itemData.y, 0]}
      onPointerOver={() => setHovering(true)}
      onPointerOut={() => setHovering(false)}
    >
      <planeGeometry args={[itemData.width, itemData.height, 32, 32]} />
      <distortionMaterial
        ref={matRef}
        tex={texture}
        frameAspect={itemData.width / itemData.height}
        textureAspect={
          texture.image instanceof HTMLImageElement
            ? texture.image.naturalWidth / texture.image.naturalHeight
            : 1
        }
      />
      <Text
        font="/fonts/Chloe-Regular.otf"
        anchorY="top"
        anchorX="left"
        textAlign="left"
        maxWidth={itemData.width}
        position={[-itemData.width / 2, -(itemData.height / 2 + 0.1), 0.001]}
        fontSize={0.14}
      >
        <meshBasicMaterial
          ref={textMaterial}
          transparent={true}
          color="#a3a3a3"
          attach="material"
        />
        {name}
      </Text>
    </mesh>
  );
}

function Scene({
  mapRef,
  mapPosRef,
  mapItemsRef,
}: {
  mapRef: RefObject<HTMLDivElement | null>;
  mapPosRef: RefObject<HTMLDivElement | null>;
  mapItemsRef: RefObject<(HTMLDivElement | null)[]>;
}) {
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  const covers = useTexture(projects.map((project) => project.coverImgSmall));

  const lastPos = useRef(new THREE.Vector3(0, 0, 0));
  const canvasBox = useRef({ width: 20, height: 20 });
  const panLimits = useRef({
    min: new THREE.Vector3(-10, -10, -10),
    max: new THREE.Vector3(10, 10, 10),
  });
  const mapItemRects = useRef<DOMRect[]>([]);
  const mapPosRect = useRef<DOMRect | null>(null);

  const [itemsData, setItemsData] = useState<ItemData[]>([]);

  const isHolding = useRef(false);
  const distortionStrength = useRef(0);
  const focalStrength = useRef(2);

  useFrame((_, delta) => {
    const hasChanged = lastPos.current.distanceTo(camera.position) > 0.005;
    speedRef.current = lerp(
      speedRef.current ?? 0,
      camera.position.distanceTo(lastPos.current) * 0.5,
      0.2,
      delta,
    );
    lastPos.current.copy(camera.position);

    // Drive lens distortion from speed (mirrors cathy-folio behavior)
    const focalValue = isHolding.current ? 0.05 : 0;
    focalStrength.current = lerp(focalStrength.current, focalValue, 0.1, delta);

    const distortionValue = (speedRef.current ?? 0) * 0.2;
    distortionStrength.current = lerp(distortionStrength.current, distortionValue, 0.2, delta);

    if (lensDistortionPass.current) {
      lensDistortionPass.current.distortion.set(distortionStrength.current, distortionStrength.current);
      lensDistortionPass.current.focalLength.set(
        1 - focalStrength.current,
        1 - focalStrength.current,
      );
    }

    if (!hasChanged || !mapPosRef.current) return;

    const top = `${(1 - (camera.position.y / canvasBox.current.height + 0.5)) * 100}%`;
    const left = `${(camera.position.x / canvasBox.current.width + 0.5) * 100}%`;

    mapPosRef.current.style.top = top;
    mapPosRef.current.style.left = left;

    const camBox = visibleBox(camera, 0);
    mapPosRef.current.style.width = `${camBox.width * 7}px`;
    mapPosRef.current.style.height = `${camBox.height * 7}px`;

    mapPosRect.current = mapPosRef.current.getBoundingClientRect();
    if (!mapPosRect.current) return;

    for (const mapItem of mapItemsRef.current) {
      if (!mapItem) continue;
      const rect = mapItem.getBoundingClientRect();

      if (isCollidingOne(mapPosRect.current, rect)) {
        mapItem.style.backgroundColor = "var(--color-primary, #b5b5b5)"; // Fallback if no css var
        mapItem.style.borderColor = "var(--color-primary, #b5b5b5)";
        mapItem.classList.add("bg-primary1", "border-primary1"); 
      } else {
        mapItem.style.backgroundColor = "transparent";
        mapItem.style.borderColor = "rgba(188, 188, 188, 0.5)";
        mapItem.classList.remove("bg-primary1", "border-primary1");
      }
    }
  });

  useEffect(() => {
    if (!covers.length || !mapRef.current || !mapPosRef.current) return;

    const items: ItemData[] = [];
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;

    for (const [index, cover] of covers.entries()) {
      const ratio =
        cover.image instanceof HTMLImageElement
          ? cover.image.naturalWidth / cover.image.naturalHeight
          : 1;

      const size =
        ratio < 1 ? { width: 2 * ratio, height: 2 } : { width: 2, height: 2 / ratio };

      const item: ItemData = { x: 0, y: 0, width: size.width, height: size.height };

      if (index === 0) {
        items.push(item);
        continue;
      }

      let positionIsValid = false;
      let numberOfTests = 0;
      let minRadius = 2;
      let tempPos = { x: 0, y: 0 };

      while (!positionIsValid) {
        tempPos = getNewPosition(minRadius);
        positionIsValid = !isColliding(items, {
          ...tempPos,
          width: item.width,
          height: item.height + 0.35,
        });

        numberOfTests += 1;
        if (numberOfTests > 10) minRadius += 0.1;
      }

      minX = Math.min(minX, tempPos.x - item.width);
      maxX = Math.max(maxX, tempPos.x + item.width);
      minY = Math.min(minY, tempPos.y - item.height);
      maxY = Math.max(maxY, tempPos.y + item.height);

      items.push({ ...item, ...tempPos });
    }

    panLimits.current.min.set(minX - 2, minY - 2, -10);
    panLimits.current.max.set(maxX + 2, maxY + 2, 10);

    canvasBox.current = {
      width: maxX - minX,
      height: maxY - minY,
    };

    const camBox = visibleBox(camera, 0);

    mapPosRef.current.style.width = `${camBox.width * 10}px`;
    mapPosRef.current.style.height = `${camBox.height * 10}px`;

    mapRef.current.style.width = `${canvasBox.current.width * 10}px`;
    mapRef.current.style.height = `${canvasBox.current.height * 10}px`;

    setItemsData(items);
  }, [camera, covers, mapPosRef, mapRef]);

  useEffect(() => {
    if (!itemsData.length || !mapRef.current || !mapPosRef.current) return;

    const id = window.setTimeout(() => {
      mapItemRects.current = [];

      for (const [index, mapItem] of mapItemsRef.current.entries()) {
        const itemData = itemsData[index];
        if (!mapItem || !itemData) continue;

        mapItem.style.left = `${itemData.x * 10}px`;
        mapItem.style.top = `${-itemData.y * 10}px`;
        mapItem.style.width = `${itemData.width * 8}px`;
        mapItem.style.height = `${itemData.height * 8}px`;

        mapItemRects.current.push(mapItem.getBoundingClientRect());
      }

      if (mapPosRef.current) {
        mapPosRect.current = mapPosRef.current.getBoundingClientRect();
      }
    }, 10);

    return () => window.clearTimeout(id);
  }, [itemsData, mapItemsRef, mapPosRef, mapRef]);

  useLayoutEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handlePan = () => {
      tempVec.copy(controls.target);
      controls.target.clamp(
        panLimits.current.min as Vector3Like,
        panLimits.current.max as Vector3Like,
      );
      tempVec.sub(controls.target);
      camera.position.sub(tempVec);
    };

    controls.addEventListener("change", handlePan);
    return () => controls.removeEventListener("change", handlePan);
  }, [camera]);

  useEffect(() => {
    speedRef.current = 0;
  }, []);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        panSpeed={2}
        enableRotate={false}
        enableZoom
        screenSpacePanning
        minDistance={1}
        maxDistance={1.6}
        mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
        touches={{ ONE: THREE.TOUCH.PAN }}
        onStart={() => { isHolding.current = true; }}
        onEnd={() => { isHolding.current = false; }}
      />
      <Plane visible={false} position-z={-0.2} args={[50, 50]} />
      <group>
        {itemsData.length > 0 &&
          projects.map((project, index) => (
            <ShaderPlane
              itemData={itemsData[index]}
              key={project.id}
              texture={covers[index]}
              name={project.name.toUpperCase()}
            />
          ))}
      </group>
    </>
  );
}

export default function RandomScene() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapPosRef = useRef<HTMLDivElement>(null);
  const mapItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background transition-colors duration-500">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1.2], fov: 140, far: 10 }} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <Scene mapRef={mapRef} mapPosRef={mapPosRef} mapItemsRef={mapItemsRef} />
        </Suspense>
        <Effects />
      </Canvas>

      <div
        ref={mapRef}
        className="pointer-events-none absolute bottom-[6vh] right-[6vw] -translate-y-1/2 opacity-80 max-[900px]:hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(element) => {
                mapItemsRef.current[index] = element;
              }}
              style={{
                border: "1px solid rgba(188, 188, 188, 0.5)",
                backgroundColor: "transparent",
                transition: "all 0.4s ease-in-out",
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[1px]"
            />
          ))}
        </div>
        <div
          ref={mapPosRef}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-[#b5b5b5]"
        />
      </div>
    </div>
  );
}
