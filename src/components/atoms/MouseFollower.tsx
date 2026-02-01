import gsap from "gsap";
import lerp from "lerp";
import { useEffect, useRef, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

const easeInOutQuad = (x: number): number =>
  x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;

let mousePos = {
  x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
};

const MouseFollower = () => {
  const isDesktop = useMediaQuery("(min-width: 769px)");

  const $mouseFollower = useRef<HTMLDivElement>(null);
  const $outerCircleWrapper = useRef<HTMLDivElement>(null);
  const $outerCircle = useRef<HTMLDivElement>(null);
  const $hoverCircle = useRef<HTMLDivElement>(null);
  const $innerCircle = useRef<HTMLDivElement>(null);

  const followerOuter = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    w: 40,
    h: 40,
  });

  const followerInner = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    w: 5,
    h: 5,
  });

  useEffect(() => {
    let isClicking = false;
    let clickProgression = 0;
    let isHovering = false;
    let hoverProgression = 0;
    let raf: number;

    const updatePos = () => {
      followerOuter.current.x = lerp(followerOuter.current.x, mousePos.x, 0.2);
      followerOuter.current.y = lerp(followerOuter.current.y, mousePos.y, 0.2);
      const outerL = followerOuter.current.x + followerInner.current.w / 2;
      const outerT = followerOuter.current.y + followerInner.current.h / 2;

      followerInner.current.x = lerp(followerInner.current.x, mousePos.x, 0.8);
      followerInner.current.y = lerp(followerInner.current.y, mousePos.y, 0.8);
      const innerL = followerInner.current.x + followerInner.current.w / 2;
      const innerT = followerInner.current.y + followerInner.current.h / 2;

      hoverProgression = gsap.utils.clamp(
        0,
        1,
        isHovering ? hoverProgression + 0.125 : hoverProgression - 0.125,
      );

      if (isClicking) {
        clickProgression += 0.125;
        clickProgression = gsap.utils.clamp(0, 1, clickProgression);
      } else {
        clickProgression -= 0.275;
        clickProgression = gsap.utils.clamp(0, 1, clickProgression);
      }

      if ($outerCircleWrapper.current && $innerCircle.current) {
        $outerCircleWrapper.current.style.transform = `
          translate3d(${outerL}px, ${outerT}px, 0)
          scale(${
            gsap.utils.mapRange(
              0,
              1,
              1,
              0.75,
              easeInOutQuad(clickProgression),
            ) +
            easeInOutQuad(hoverProgression) * 0.25
          })
        `;
        $innerCircle.current.style.transform = `
          translate3d(${innerL}px, ${innerT}px, 0)
        `;
      }

      raf = requestAnimationFrame(updatePos);
    };

    const mousemoveHandler = (e: MouseEvent) => {
      const { clientX, clientY, target } = e;
      mousePos = { x: clientX, y: clientY };
      isHovering = false;

      if ($outerCircleWrapper.current && target instanceof HTMLElement) {
        if (
          target.nodeName === "BUTTON" ||
          target.nodeName === "A" ||
          target.classList.contains("mf-active")
        ) {
          isHovering = true;
        }

        if (target.parentElement) {
          if (
            target.parentElement.nodeName === "BUTTON" ||
            target.parentElement.nodeName === "A" ||
            target.parentElement.classList.contains("mf-active")
          ) {
            isHovering = true;
          }
        }

        if (isHovering) {
          gsap.to($outerCircle.current, { borderColor: "transparent" });
          gsap.to($hoverCircle.current, { scale: 1 });
        } else {
          gsap.to($outerCircle.current, {
            borderColor: "var(--color-primary, rgb(59, 130, 246))",
          });
          gsap.to($hoverCircle.current, { scale: 0.01 });
        }
      }
    };

    const mousedownHandler = () => {
      if ($mouseFollower.current) isClicking = true;
    };

    const mouseupHandler = () => {
      if ($mouseFollower.current) isClicking = false;
    };

    const showFollower = () => {
      gsap.to($mouseFollower.current, { opacity: 1, duration: 0.6 });
    };

    raf = requestAnimationFrame(updatePos);
    window.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mousedown", mousedownHandler);
    window.addEventListener("mouseup", mouseupHandler);
    window.addEventListener("mousemove", showFollower, { once: true });

    return () => {
      window.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mousedown", mousedownHandler);
      window.removeEventListener("mouseup", mouseupHandler);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      ref={$mouseFollower}
      className="fixed z-1000 opacity-0 pointer-events-none"
      style={{ mixBlendMode: "difference" }}
    >
      <div
        ref={$innerCircle}
        className="z-1000 pointer-events-none w-[5pt] h-[5pt] bg-primary rounded-full fixed -top-[2.5pt] -left-[2.5pt]"
      />
      <div
        ref={$outerCircleWrapper}
        className="z-1000 pointer-events-none fixed -top-5 -left-5 size-10"
      >
        <div
          ref={$outerCircle}
          className="absolute w-10 h-10 border border-primary rounded-full text-primary text-[40px]"
        />
        <div
          ref={$hoverCircle}
          className="absolute size-10 rounded-full bg-primary opacity-30 scale-[0.01]"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default MouseFollower;
